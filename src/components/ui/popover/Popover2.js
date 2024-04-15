import React, { useState, useEffect } from "react";

const Popover = ({ content, targetId, trigger, position = "right" }) => {
  console.log("Popover Component");
  const [isVisible, setIsVisible] = useState(false);

  const popoverStyle = {
    position: "relative",
    zIndex: 1000,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };
  const PopoverId = targetId ? targetId + position : "popover1";
  useEffect(() => {
    console.log("Popover useEffect");
    const targetElement = document.getElementById(targetId);

    const showPopover = () => {
      setIsVisible(true);
    };

    const hidePopover = () => {
      setIsVisible(false);
    };
    const togglePopover = (e) => {
      if (e.target.id !== targetId && e.currentTarget.id !== targetId) return;
      setIsVisible((prevState) => !prevState);
    };

    const updatePopoverPosition = () => {
      if (isVisible) {
        const PopoverElement = document.getElementById(PopoverId);
        const targetElement = document.getElementById(targetId);
        const Wrapper = document.getElementById(PopoverId + "wrapper");

        const {
          top: PopoverTop,
          left: PopoverLeft,
          width: PopoverWidth,
          height: PopoverHeight,
        } = PopoverElement.getBoundingClientRect();
        const {
          top: targetTop,
          left: targetLeft,
          width: targetWidth,
          height: targetHeight,
        } = targetElement.getBoundingClientRect();
        const { top: WrapperTop, left: WrapperLeft } =
          Wrapper.getBoundingClientRect();

        const popoverCommonLeft =
          targetLeft - PopoverLeft + (targetWidth - PopoverWidth) / 2;
        const popoverCommonTop = targetTop - PopoverTop;

        const wrapperCommonLeft = targetLeft - WrapperLeft;
        const wrapperCommonTop = targetTop - WrapperTop;

        if (position === "top") {
          PopoverElement.style.top = `${popoverCommonTop - PopoverHeight}px`;
          PopoverElement.style.left = `${popoverCommonLeft}px`;
          Wrapper.style.borderBottom = "0px";
          Wrapper.style.borderTop = "10px solid red";
          Wrapper.style.top = `${wrapperCommonTop - 10}px`;
          Wrapper.style.left = `${wrapperCommonLeft + PopoverWidth / 2}px`;
        } else if (position === "bottom") {
          PopoverElement.style.top = `${
            targetTop - PopoverTop + targetHeight + 20
          }px`;
          PopoverElement.style.left = `${popoverCommonLeft}px`;
          Wrapper.style.borderTop = "0px";
          Wrapper.style.borderBottom = "10px solid red";
          Wrapper.style.left = `${wrapperCommonLeft + PopoverWidth / 2}px`;
          Wrapper.style.top = `${wrapperCommonTop + targetHeight}px`;
        } else if (position === "left") {
          PopoverElement.style.left = `${
            targetLeft - PopoverLeft - PopoverWidth - 10
          }px`;
          PopoverElement.style.top = `${popoverCommonTop - targetHeight / 2}px`;
          Wrapper.style.borderRight = "0px";
          Wrapper.style.borderLeft = "10px solid red";
          Wrapper.style.left = `${wrapperCommonLeft - 10}px`;
          Wrapper.style.top = `${wrapperCommonTop}px`;
        } else {
          PopoverElement.style.left = `${
            targetLeft - PopoverLeft + targetWidth + 10
          }px`;
          PopoverElement.style.top = `${popoverCommonTop - targetHeight / 2}px`;
          Wrapper.style.borderLeft = "0px";
          Wrapper.style.borderRight = "10px solid red";
          Wrapper.style.left = `${wrapperCommonLeft + targetWidth}px`;
          Wrapper.style.top = `${wrapperCommonTop}px`;
        }

        // End
      }
    };

    if (trigger === "hover") {
      targetElement.addEventListener("mouseenter", showPopover);
      targetElement.addEventListener("mouseleave", hidePopover);
    } else if (trigger === "click") {
      targetElement.addEventListener("click", togglePopover);
    }

    updatePopoverPosition(); // Initial position update

    window.addEventListener("scroll", updatePopoverPosition); // Update position on scroll

    return () => {
      if (trigger === "hover") {
        targetElement.removeEventListener("mouseenter", showPopover);
        targetElement.removeEventListener("mouseleave", hidePopover);
      } else if (trigger === "click") {
        targetElement.removeEventListener("click", togglePopover);
      }
      window.removeEventListener("scroll", updatePopoverPosition);
    };
  }, [targetId, trigger, position, isVisible]);

  return (
    <>
      {isVisible && (
        <div>
          <div
            id={PopoverId + "wrapper"}
            className="relative"
            style={{
              width: 0,
              height: 0,
              border: "10px solid transparent",
            }}
          ></div>
          <div id={PopoverId} className="w-[fit-content]" style={popoverStyle}>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Popover;
