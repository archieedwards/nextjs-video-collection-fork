"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CreateVideo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          as={Link}
          href="/"
          variant="light"
          className="gap-2"
          startContent={<ChevronLeft size={20} />}
        >
          Back to videos
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto p-4">
        <CardHeader>
          <h1 className="text-2xl font-bold">Create a new video</h1>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-6">
            <div>
              <Input
                isRequired
                label="Title"
                placeholder="Enter video title"
                variant="flat"
              />
            </div>
            <div>
              <Textarea
                isRequired
                label="Description"
                placeholder="Enter video description"
                variant="flat"
                minRows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button as={Link} href="/" variant="flat" color="danger">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create Video
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
