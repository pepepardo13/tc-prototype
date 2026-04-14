import type { TaskDisplayState } from "../../../lib/types/generation.ts";

import { Box, CustomButtonBase, Text } from "@envato/design-system/components";

import { ImagePlaceholder } from "../../../components/ImagePlaceholder.tsx";
import { LoadingImage } from "../../../components/LoadingImage/index.ts";
import { useImageEditorContext } from "../components/ImageEditorProvider.tsx";

export type TaskThumbnailsProps = {
  /** Task display states */
  tasks: TaskDisplayState[];
  /** Currently selected task index */
  selectedIndex: number;
  /** Callback when task is selected */
  onSelect: (index: number) => void;
};

/**
 * Single task thumbnail
 */
function TaskThumbnail({
  task,
  index,
  isSelected,
  onSelect,
}: {
  task: TaskDisplayState;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}) {
  const isPending = task.status === "pending" || task.status === "running";
  const isFailed = task.status === "failed";
  const isCompleted = task.status === "success";

  // Determine border color based on state
  const borderColor = isSelected
    ? "active"
    : isFailed
      ? "critical"
      : "transparent";

  return (
    <CustomButtonBase
      onClick={() => onSelect(index)}
      disabled={!isCompleted}
      aria-label={`Task ${index + 1}`}
      aria-pressed={isSelected}
      padding="none"
      boxShadow="none"
      borderRadius="2x"
      overflow="hidden"
    >
      <Box
        borderRadius="2x"
        overflow="hidden"
        borderWidth="thin"
        borderStyle="solid"
        borderColor={borderColor}
        dangerouslySetStyle={{
          width: "64px",
          height: "64px",
        }}
      >
        {task.image ? (
          <LoadingImage image={task.image} />
        ) : isFailed ? (
          <Box
            backgroundColor="critical-default"
            width="full"
            height="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="inverse" variant="body-small">
              !
            </Text>
          </Box>
        ) : (
          <ImagePlaceholder variant={isPending ? "long" : "default"} />
        )}
      </Box>
    </CustomButtonBase>
  );
}

/**
 * Task thumbnails strip - shows all tasks with selection
 */
export function TaskThumbnails({
  tasks,
  selectedIndex,
  onSelect,
}: TaskThumbnailsProps) {
  const { pointerEvents } = useImageEditorContext();

  return (
    <Box
      display="flex"
      gap="2x"
      justifyContent="center"
      pointerEvents={pointerEvents}
    >
      {tasks.map((task, index) => (
        <TaskThumbnail
          key={task.taskId}
          task={task}
          index={index}
          isSelected={index === selectedIndex}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
}
