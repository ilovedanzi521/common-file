/**
 * 表单弹框对象
 */
export default class DialogVO {
    /**弹框标题 */
    title: string = "";
    /**弹框是否禁用 */
    disableFlag: boolean = false;
    /**弹框功能，0查看,1新增 2修改 3删除 */
    action: number = 1;
    /**是否显示 */
    visible: boolean = false;
    /**是否可以通过点击 modal 关闭 Dialog */
    closeOnClickModal: boolean = false;

    getSeeDialog(title): DialogVO {
        this.title = title;
        this.action = 0;
        this.disableFlag = true;
        this.visible = true;
        return this;
    }

    getAddDialog(title): DialogVO {
        this.title = title;
        this.action = 1;
        this.disableFlag = false;
        this.visible = true;
        return this;
    }

    getUpdateDialog(title): DialogVO {
        this.title = title;
        this.action = 2;
        this.disableFlag = false;
        this.visible = true;
        return this;
    }

    getDeleteDialog(title): DialogVO {
        this.title = title;
        this.action = 3;
        this.disableFlag = true;
        this.visible = true;
        return this;
    }
}
