import { entries } from "../../utils/object";

export class Session {
  private readonly session: MediaSession | undefined;

  constructor() {
    if (navigator.mediaSession != null) {
      this.session = navigator.mediaSession;
    }
  }

  public get metadata(): MediaMetadata | null {
    return this.session?.metadata ?? null;
  }

  public set metadata(metadata: MediaMetadata | null) {
    if (this.session != null) {
      this.session.metadata = metadata;
    }
  }

  public set playbackState(state: MediaSessionPlaybackState) {
    if (this.session != null) {
      this.session.playbackState = state;
    }
  }

  public setActionHandlers = (
    handlers: Partial<Record<MediaSessionAction, MediaSessionActionHandler>>
  ): (() => void) => {
    if (this.session == null) {
      return () => {};
    }

    for (const [action, handler] of entries(handlers)) {
      try {
        this.session.setActionHandler(action, (event) => handler?.(event));
      } catch (error) {
        console.error(
          `The media session action "${action}" is not supported yet.`
        );
      }
    }

    return () => {
      for (const [action] of entries(handlers)) {
        try {
          this.session?.setActionHandler(action, null);
        } catch (error) {
          console.error(
            `The media session action "${action}" is not supported yet.`
          );
        }
      }
    };
  };
}
