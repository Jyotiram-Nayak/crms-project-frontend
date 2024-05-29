import { getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

// Define the middleware function
export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const isLoginUser = getCookie('token', { req, res })
	const userRole = getCookie('role', { req, res })

    // Define the routes and their permitted roles
    const routePermissions: { [key: string]: string[] } = {
        '/company/jobposting': ['Company'],
        '/company/jobpost-table/[jobid]': ['Company'],
        '/company/universitytable': ['Company','Admin'],
        '/company/jobpost-table': ['Admin','University', 'Student', 'Company'],
        '/dashboard': ['University', 'Student', 'Company', 'Admin'],
        '/profile': ['University', 'Student', 'Company', 'Admin'],
        '/profile/change-password': ['University', 'Student', 'Company', 'Admin'],
        '/profile/update-profile': ['University', 'Company', 'Admin'],
        '/student/all-apply-jobs/': ['Student','Company'],
        '/student/all-apply-jobs/[applicationId]': ['Student','Company'],
        '/company/jobposting/[jobId]': ['Student'],
        '/university/company-list': ['Admin','University'],
        '/university/students/[userId]': ['University'],
        '/university/students/student-form': ['University'],
        '/university/students/student-table': ['University'],
        '/zego-cloud/[roomId]': ['Student', 'Company']
    };

    // Get the current route
    const currentRoute = req.nextUrl.pathname;

    // Check if the current route is protected
    if (routePermissions[currentRoute]) {
        if (!isLoginUser) {
            // User is not logged in, redirect to the login page
            return NextResponse.redirect(new URL('/auth/signin', req.url))
        }
        // Check if the user role is permitted for this route
        if (userRole && routePermissions[currentRoute].includes(userRole)) {
            // User has permission, proceed to the next middleware
            return NextResponse.next();
        } else {
            // User does not have permission, redirect or handle error as needed
            return NextResponse.redirect(new URL('/not-found', req.url))
        }
    }

    // If the route is not protected, allow access
    return NextResponse.next();
}
