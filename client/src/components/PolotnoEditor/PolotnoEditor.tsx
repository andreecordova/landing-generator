// Libraries and Hooks
import React, { useState } from "react";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { PagesTimeline } from "polotno/pages-timeline";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import styles from "./editor.module.css";

interface Props {
  store: any;
  onClose: () => void;
}

export const PolotnoEditor: React.FC<Props> = ({ store, onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Estado interno del modal

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
        >
          ✖
        </button>

        <div className={styles.containerEditor}>
          <PolotnoContainer style={{ width: "100%", height: "100%" }}>
            <SidePanelWrap>
              <SidePanel store={store} />
            </SidePanelWrap>
            <WorkspaceWrap>
              <Toolbar
                store={store}
                downloadButtonEnabled
              />
              <Workspace store={store} />
              <ZoomButtons store={store} />
              <PagesTimeline store={store} />
            </WorkspaceWrap>
          </PolotnoContainer>
        </div>
      </div>
    </div>
  );
};
