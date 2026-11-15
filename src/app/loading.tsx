import LoadingState from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center px-5 py-24">
      <LoadingState variant="Drive" label="Loading SASH Broadband..." />
    </div>
  );
}
