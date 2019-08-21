function changeTab(key) {
    document.addEventListener("keydown", e => {
        let keyCode = e.keyCode;
        if (keyCode === 9) {
            this.layoutReqVO.secondMeunIsOpen = true;
            if (this.layoutReqVO.secondMeunIsOpen) {
                this.layoutReqVO.firstMenuIndex = "2222";
            } else {
                this.layoutReqVO.firstMenuIndex = "";
            }
        }
    });
}

export { changeTab };
