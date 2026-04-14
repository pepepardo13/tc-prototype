import type {
  ImageReference,
  Job,
  TaskDisplayState,
} from "../../../lib/types/generation.ts";
import type { ImageData } from "../../../types/ImageData.ts";
import type { UseBrushToolsReturn } from "../hooks/useBrushTools.ts";

import { Box } from "@envato/design-system/components";

import { ImageEditorLayout } from "../components/ImageEditorLayout/ImageEditorLayout.tsx";

import { TaskThumbnails } from "./TaskThumbnails.tsx";

export type JobEditorViewProps = {
  /** The current job */
  job: Job;
  /** Session ID */
  sessionId: string;
  /** Task display states */
  tasks: TaskDisplayState[];
  /** Currently selected task index */
  selectedTaskIndex: number;
  /** Callback when task is selected */
  onSelectTask: (index: number) => void;
  /** Image data for the currently selected completed task */
  displayImage: ImageData | null;
  /** Source image for the next generation (selected result or original source) */
  sourceImage: ImageReference | null;
  /** Whether any task is still pending */
  isPending: boolean;
  /** Whether form is submitting */
  isSubmitting: boolean;
  /** Reference images for style/content guidance */
  referenceImages: Array<{ id: string; token: string; url: string | null }>;
  /** Callback when reference image changes */
  onReferenceImageChange: (
    index: number,
    id: string | null,
    token: string | null,
    presignedUrl?: string | null,
  ) => void;
  /** Callback when reference image is added */
  onAddReferenceImage: (
    id: string,
    token: string,
    presignedUrl?: string | null,
  ) => void;
  /** Brush tools state and callbacks */
  brushTools: UseBrushToolsReturn;
  /** Error message from action */
  error?: string;
};

/**
 * Job Editor View - Main editing area with image and tasks
 */
export function View({
  job,
  sessionId,
  tasks,
  selectedTaskIndex,
  onSelectTask,
  displayImage,
  sourceImage,
  isPending,
  isSubmitting,
  referenceImages,
  onReferenceImageChange,
  onAddReferenceImage,
  brushTools,
  error,
}: JobEditorViewProps) {
  return (
    <ImageEditorLayout
      brushTools={brushTools}
      imageUrl={displayImage?.fallbackSrc ?? undefined}
      isPending={isPending}
      action={`/image-edit/${sessionId}/${job.jobId}`}
      disabled={isSubmitting || isPending}
      sourceImage={sourceImage ?? undefined}
      defaultPrompt={job.params.prompt || ""}
      referenceImages={referenceImages}
      onReferenceImageChange={onReferenceImageChange}
      onAddReferenceImage={onAddReferenceImage}
      error={error}
    >
      {/* Task thumbnails (only if multiple tasks) - floating above toolbar */}
      {tasks.length > 1 && (
        <Box
          pointerEvents="none"
          position="absolute"
          bottom="none"
          left="none"
          right="none"
          zIndex="1"
          display="flex"
          justifyContent="center"
          dangerouslySetStyle={{ bottom: "260px" }}
        >
          <TaskThumbnails
            tasks={tasks}
            selectedIndex={selectedTaskIndex}
            onSelect={onSelectTask}
          />
        </Box>
      )}
    </ImageEditorLayout>
  );
}
