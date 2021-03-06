import MenuEvent from '../MenuEvent';
import AddObjectCommand from '../../../command/AddObjectCommand';

var ID = 1;

/**
 * 添加透视相机事件
 * @author tengge / https://github.com/tengge1
 * @param {*} app 
 */
function AddPerspectiveCameraEvent(app) {
    MenuEvent.call(this, app);
}

AddPerspectiveCameraEvent.prototype = Object.create(MenuEvent.prototype);
AddPerspectiveCameraEvent.prototype.constructor = AddPerspectiveCameraEvent;

AddPerspectiveCameraEvent.prototype.start = function () {
    var _this = this;
    this.app.on('mAddPerspectiveCamera.' + this.id, function () {
        _this.onAddPerspectiveCamera();
    });
};

AddPerspectiveCameraEvent.prototype.stop = function () {
    this.app.on('mAddPerspectiveCamera.' + this.id, null);
};

AddPerspectiveCameraEvent.prototype.onAddPerspectiveCamera = function () {
    var editor = this.app.editor;

    var camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
    camera.name = '透视相机' + ID++;

    editor.execute(new AddObjectCommand(camera));
};

export default AddPerspectiveCameraEvent;