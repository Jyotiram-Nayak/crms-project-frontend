// extractUserFromToken.ts
interface User {
    id: number;
    email: string;
    role:string;
    // Add other user properties as needed
  }
  
  const extractUserFromToken = (token: string): User => {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const user: User = {
      id: tokenPayload.id,
      email: tokenPayload.email,
      role:tokenPayload.role,
      // Extract other user properties from the token payload
    };
    return user;
  };
  