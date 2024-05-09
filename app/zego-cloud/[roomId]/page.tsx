"use client"
import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface PageProps {
  params: {
    roomId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const roomId = params.roomId;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement | null) => {
      if (!element) return;

      const appID = 622756538;
      const serverSecret = "b6c5a49df365a3d87b7f41bd641425fb";
      const userId = Date.now().toString();

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userId, "Enter Name");
      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: element,
        sharedLinks: [{
          name: "Copy Link",
          url: `http://localhost:3000/Home/${roomId}`,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall
        }
      });
    }

    myMeeting(elementRef.current);
  }, [roomId]);

  return (
    <div className='h-screen'>
      <div ref={elementRef}></div>
    </div>
  );
};

export default Page;
