import { Button } from "@heroui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Video Not Found</h2>
      <p className="text-gray-500 mb-8">
        {`The video you're looking for doesn't exist or has been removed.`}
      </p>
      <Button as={Link} href="/" color="primary" variant="flat">
        Back to Home
      </Button>
    </div>
  );
}
