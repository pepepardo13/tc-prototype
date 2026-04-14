import styles from "./VideoCard.module.scss";

export type VideoCardState =
  | "ready"
  | "ready11"
  | "loading"
  | "generating"
  | "queue"
  | "failed"
  | "delete"
  | "playing";

export type VideoCardProps = {
  state: VideoCardState;
  /** Renders a compact card without a side panel, sized for mobile viewports */
  mobile?: boolean;
  /** Whether to apply rounded corners to the card (default true) */
  rounded?: boolean;
  title?: string;
  author?: string;
  prompt?: string;
  date?: string;
  thumbnail?: string;
  duration?: string;
  onDownload?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
  onDeleteConfirm?: () => void;
  onDeleteCancel?: () => void;
  onExtend?: () => void;
  onModify?: () => void;
  onChangeSubject?: () => void;
  onReframe?: () => void;
};

const isPendingState = (state: VideoCardState) =>
  state === "generating" || state === "queue" || state === "failed";

const isSquareState = (state: VideoCardState) => state === "ready11";

function SparkIcon({ color = "#87e64b" }: { color?: string }) {
  return (
    <svg
      className={styles["sparkIcon"]}
      viewBox="0 0 46 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.8 0L0 36.3h17.1L10.3 64l35.3-36.3H28.4L45.6 0H22.8z"
        fill={color}
      />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm16 5h-5v2h7v-7h-2v5z"
        fill="white"
      />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
        fill="white"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
        fill="currentColor"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="2" fill="white" />
      <circle cx="12" cy="12" r="2" fill="white" />
      <circle cx="19" cy="12" r="2" fill="white" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="currentColor"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
        fill="white"
      />
    </svg>
  );
}

function ExtendIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18h16v2H4v-2zm4-4h8v2H8v-2zM4 10h16v2H4v-2zm4-4h8v2H8V6z" fill="currentColor" />
    </svg>
  );
}

function ModifyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
        fill="currentColor"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm-2-5h4v1h-4V9z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="white" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="white" />
    </svg>
  );
}

function SkeletonSidePanel() {
  return (
    <div className={styles["sidePanel"]}>
      <div className={styles["sidePanelInfo"]}>
        <div className={styles["sidePanelTop"]}>
          <div className={styles["skeletonBars"]}>
            <div
              className={styles["skeleton"]}
              style={{ height: 14, width: "60%" }}
            />
            <div
              className={styles["skeleton"]}
              style={{ height: 18, width: "100%" }}
            />
            <div
              className={styles["skeleton"]}
              style={{ height: 14, width: "100%" }}
            />
            <div
              className={styles["skeleton"]}
              style={{ height: 14, width: "60%" }}
            />
            <div
              className={styles["skeleton"]}
              style={{ height: 14, width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(25,25,25,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles["sidePanelActions"]}>
          <div className={styles["buttonRow"]}>
            <button className={styles["secondaryButton"]} type="button" disabled>
              Extend
            </button>
            <button className={styles["elevatedButton"]} type="button" disabled>
              &nbsp;
            </button>
          </div>
          <button
            className={`${styles["elevatedButton"]} ${styles["elevatedButton--full"]}`}
            type="button"
            disabled
          >
            Change Subject
          </button>
          <button
            className={`${styles["elevatedButton"]} ${styles["elevatedButton--full"]}`}
            type="button"
            disabled
          >
            Reframe
          </button>
          <button className={styles["disabledButton"]} type="button" disabled>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadySidePanel({
  prompt,
  date,
  onExtend,
  onModify,
  onChangeSubject,
  onReframe,
  onDownload,
}: Pick<
  VideoCardProps,
  | "prompt"
  | "date"
  | "onExtend"
  | "onModify"
  | "onChangeSubject"
  | "onReframe"
  | "onDownload"
>) {
  return (
    <div className={styles["sidePanel"]}>
      <div className={styles["sidePanelInfo"]}>
        <div className={styles["sidePanelTop"]}>
          <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            <p className={styles["promptLabel"]}>Prompt</p>
            <p className={styles["promptText"]}>
              {prompt ?? "A quick, airy whoosh, resembling a swift hand movement"}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 8 }}>
            <p className={styles["dateText"]}>{date ?? "01 July 2025"}</p>
            <p className={styles["termsText"]}>
              This AI generated image may be used for personal and commercial
              use, subject to the{" "}
              <a
                className={styles["termsLink"]}
                href="https://labs.envato.com/product-terms"
                target="_blank"
                rel="noreferrer"
              >
                Product Terms
              </a>
              .
            </p>
          </div>
          <div className={styles["iconActions"]}>
            {[CopyIcon, CopyIcon, CopyIcon].map((Icon, i) => (
              <button
                key={i}
                className={styles["ghostIconButton"]}
                type="button"
                aria-label="Action"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
        <div className={styles["sidePanelActions"]}>
          <div className={styles["buttonRow"]}>
            <button
              className={styles["secondaryButton"]}
              type="button"
              onClick={onExtend}
            >
              <ExtendIcon />
              Extend
            </button>
            <button
              className={styles["elevatedButton"]}
              type="button"
              onClick={onModify}
            >
              <ModifyIcon />
              Modify
            </button>
          </div>
          <button
            className={`${styles["elevatedButton"]} ${styles["elevatedButton--full"]}`}
            type="button"
            onClick={onChangeSubject}
          >
            <PersonIcon />
            Change Subject
          </button>
          <button
            className={`${styles["elevatedButton"]} ${styles["elevatedButton--full"]}`}
            type="button"
            onClick={onReframe}
          >
            <ZoomOutIcon />
            Reframe
          </button>
          <button
            className={styles["primaryButton"]}
            type="button"
            onClick={onDownload}
          >
            Download
            <DownloadIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoThumbnailCard({
  title,
  author,
  thumbnail,
  duration,
  state,
  mobile = false,
  rounded = true,
  onCancel,
  onRetry,
}: Pick<
  VideoCardProps,
  "title" | "author" | "thumbnail" | "duration" | "state" | "mobile" | "rounded" | "onCancel" | "onRetry"
>) {
  const isWide = !mobile && isPendingState(state);
  const isSquare = isSquareState(state);

  const cardClass = [
    styles["videoCard"],
    isWide ? styles["videoCard--wide"] : styles["videoCard--compact"],
    !rounded ? styles["videoCard--noRound"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const thumbnailClass = [
    styles["thumbnail"],
    isSquare ? styles["thumbnail--square"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showOverlays = !isPendingState(state) && state !== "delete";
  const placeholderLabel = isSquare ? "1:1" : "16:9";

  return (
    <div className={cardClass}>
      <div className={thumbnailClass}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title ?? "Video thumbnail"}
            className={styles["thumbnailImage"]}
          />
        ) : (
          <div className={styles["thumbnailPlaceholder"]}>{placeholderLabel}</div>
        )}

        {showOverlays && (
          <>
            <div className={styles["titleOverlay"]}>
              {mobile ? (
                <button
                  className={styles["playButton"]}
                  type="button"
                  aria-label="Play"
                >
                  <PlayIcon />
                </button>
              ) : null}
              <div className={styles["titleBadge"]}>
                <div className={styles["titleBadgeTitle"]}>
                  {title ?? "Item title goes here"}
                </div>
                <div className={styles["titleBadgeAuthor"]}>
                  {author ?? "Author name"}
                </div>
              </div>
              {!mobile && (
                <button
                  className={styles["fullscreenButton"]}
                  type="button"
                  aria-label="Fullscreen"
                >
                  <FullscreenIcon />
                </button>
              )}
            </div>

            <div className={styles["actionsOverlay"]}>
              {state !== "playing" &&
                [0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={styles["overlayIconButton"]}
                    type="button"
                    aria-label="More options"
                  >
                    <MoreIcon />
                  </button>
                ))}
              {state === "playing" && (
                <button
                  className={styles["overlayIconButton"]}
                  type="button"
                  aria-label="Pause"
                >
                  <PauseIcon />
                </button>
              )}
            </div>

            <div className={styles["durationBadge"]}>
              <VolumeIcon />
              <span>{duration ?? "0:16"}</span>
            </div>

            {state === "playing" && (
              <div className={styles["playbackBar"]}>
                <div className={styles["playbackProgress"]} />
              </div>
            )}
          </>
        )}

        {state === "generating" && (
          <div className={styles["pendingContent"]}>
            <SparkIcon color="#87e64b" />
            <div className={styles["pendingText"]}>
              <p className={styles["pendingTitle"]}>Generating your video</p>
              <p className={styles["pendingSubtitle"]}>
                It should be ready in 1–2 minutes.
              </p>
            </div>
            {mobile && (
              <button
                className={styles["cancelButton"]}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        )}

        {state === "queue" && (
          <div className={styles["pendingContent"]}>
            <SparkIcon color="#666" />
            <div className={styles["pendingText"]}>
              <p className={styles["pendingTitle"]}>Your video is in the queue</p>
              <p className={styles["pendingSubtitle"]}>
                It should be ready in 1–2 minutes.
              </p>
            </div>
            {mobile && (
              <button
                className={styles["cancelButton"]}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        )}

        {state === "failed" && (
          <div className={styles["pendingContent"]}>
            <div className={styles["pendingText"]}>
              <p className={styles["pendingTitle"]}>The generation failed</p>
              <p className={styles["pendingSubtitle"]}>Please retry again</p>
            </div>
            {mobile && (
              <button
                className={styles["primaryButton"]}
                type="button"
                onClick={onRetry}
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {!mobile && (state === "generating" || state === "queue") && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px 0 20px",
          }}
        />
      )}
    </div>
  );
}

function MobileDeleteOverlay({
  onDeleteConfirm,
  onDeleteCancel,
}: Pick<VideoCardProps, "onDeleteConfirm" | "onDeleteCancel">) {
  return (
    <div className={styles["mobileDeleteOverlay"]}>
      <p className={styles["mobileDeleteTitle"]}>
        Do you really want to delete this video?
      </p>
      <p className={styles["mobileDeleteBody"]}>
        This action can not be undone.
      </p>
      <div className={styles["mobileDeleteActions"]}>
        <button
          className={`${styles["primaryButton"]} ${styles["primaryButton--danger"]}`}
          type="button"
          onClick={onDeleteConfirm}
        >
          Delete
        </button>
        <button
          className={styles["elevatedButton"]}
          type="button"
          onClick={onDeleteCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function VideoCard({
  state,
  mobile = false,
  rounded = true,
  title,
  author,
  prompt,
  date,
  thumbnail,
  duration,
  onDownload,
  onCancel,
  onRetry,
  onDeleteConfirm,
  onDeleteCancel,
  onExtend,
  onModify,
  onChangeSubject,
  onReframe,
}: VideoCardProps) {
  const isReady = state === "ready" || state === "ready11" || state === "playing";
  const isLoading = state === "loading";
  const isPending = isPendingState(state);
  const isDelete = state === "delete";

  if (mobile) {
    return (
      <div
        className={styles["card"]}
        style={{ position: "relative", alignItems: "stretch" }}
      >
        <VideoThumbnailCard
          title={title}
          author={author}
          thumbnail={thumbnail}
          duration={duration}
          state={state}
          mobile={true}
          rounded={rounded}
          onCancel={onCancel}
          onRetry={onRetry}
        />

        {isDelete && (
          <MobileDeleteOverlay
            onDeleteConfirm={onDeleteConfirm}
            onDeleteCancel={onDeleteCancel}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={styles["card"]}
      style={{ position: "relative", alignItems: "stretch" }}
    >
      <VideoThumbnailCard
        title={title}
        author={author}
        thumbnail={thumbnail}
        duration={duration}
        state={state}
        mobile={false}
        rounded={rounded}
      />

      {(isReady || isLoading || isDelete) ? (
        <ReadySidePanel
          prompt={prompt}
          date={date}
          onExtend={onExtend}
          onModify={onModify}
          onChangeSubject={onChangeSubject}
          onReframe={onReframe}
          onDownload={onDownload}
        />
      ) : isPending ? (
        <SkeletonSidePanel />
      ) : null}

      {(state === "generating" || state === "queue") && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
          }}
        >
          <button
            className={styles["cancelButton"]}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}

      {state === "failed" && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
          }}
        >
          <button
            className={styles["primaryButton"]}
            type="button"
            onClick={onRetry}
          >
            Retry
          </button>
        </div>
      )}

      {isDelete && (
        <div className={styles["modalOverlay"]}>
          <div className={styles["modalHeader"]}>
            <div className={styles["modalHeaderContent"]}>
              <div className={styles["modalDangerIcon"]}>
                <WarningIcon />
              </div>
              <p className={styles["modalTitle"]}>
                Do you really want to delete this?
              </p>
            </div>
            <button
              className={styles["modalCloseButton"]}
              type="button"
              onClick={onDeleteCancel}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
          <div className={styles["modalBody"]}>
            <p>
              Do you really want to remove these items from your workspace? This
              action can not be undone.
            </p>
          </div>
          <div className={styles["modalFooter"]}>
            <button
              className={`${styles["primaryButton"]} ${styles["primaryButton--large"]}`}
              type="button"
              onClick={onDeleteConfirm}
              style={{ width: "auto", padding: "8px 24px" }}
            >
              Delete
            </button>
            <button
              className={styles["elevatedButton"]}
              type="button"
              onClick={onDeleteCancel}
              style={{ flex: "none", padding: "8px 16px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
