import { Text } from "@envato/design-system/components";

type Props = {
  loadingText: string;
  progress: number;
};

const LoadingText = ({ loadingText, progress }: Props) => {
  // From a user perspective, showing 99% feels better as it helps maintain patience,
  // since loading the final result data can take a little longer.
  // Let's avoid confusion in practice by never displaying 100% to the user.
  const progressPercentage = progress >= 100 ? 99 : progress;

  return (
    <Text variant="label-large">
      {loadingText}
      {progressPercentage}%
    </Text>
  );
};

export default LoadingText;
