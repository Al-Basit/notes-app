import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, Trash2 } from "lucide-react";
import MeetingService from "@/services/meeting.service";
import { useNavigate } from "react-router-dom";

interface DeleteMeetingButtonProps {
  meetingId: string | number;
  onDelete?: () => void;
  onCloseDrawer?: () => void; // Added prop for closing the drawer
}

const { useHandleDeleteMeeting } = MeetingService();
export function DeleteMeetingButton({
  meetingId,
  onDelete,
  onCloseDrawer, // Added prop for closing the drawer
}: DeleteMeetingButtonProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteMeeting, isPending } = useHandleDeleteMeeting();

  const handleDelete = () => {
    deleteMeeting(meetingId, {
      onSuccess: () => {
        setOpen(false);
        if (onDelete) {
          onDelete();
        }
        if (onCloseDrawer) {
          onCloseDrawer(); // Close the drawer on success
        }
        navigate("/meetings");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Meeting
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            meeting.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
