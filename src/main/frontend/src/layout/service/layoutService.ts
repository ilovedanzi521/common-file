import { WinResponseData } from "../../page/common/vo/BaseVO";
import AxiosFun from "../../api/AxiosFun";

/**
 * Layout获取数据
 */
export default class LayoutService {
    /**获取快捷键列表 */
    static collectMenus(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/collectmenus/list",
            vo
        );
    }

    /**获取快捷键列表 */
    static menuTree(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/menuTree/users/menu",
            vo
        );
    }

    /**获取快捷键列表 */
    static lasterVisitMenu(): Promise<WinResponseData> {
        return AxiosFun.get(
            AxiosFun.authCenterServiceName + "/api/menuTree/users/visit"
        );
    }

    static addVisitMenu(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/visitMenus/add ",
            vo
        );
    }

    /**添加快捷键 */
    static addCollectmenu(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/collectmenus/add",
            vo
        );
    }

    /**删除快捷键 */
    static deleteCollectmenu(id): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/collectmenus/" + id,
            {}
        );
    }

    /**删除快捷键 */
    static deleteCollectMenuByMenuId(menuId): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/collectmenus/deleteByMenuId",
            { menuId: menuId }
        );
    }

    /**修改密码 */
    static modifyPassword(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/modifyPassword ",
            vo
        );
    }
    /***锁屏 */
    static lockScreen(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/validate  ",
            vo
        );
    }

    /***解屏 */
    static solutionScreen(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/validate ",
            vo
        );
    }
}
