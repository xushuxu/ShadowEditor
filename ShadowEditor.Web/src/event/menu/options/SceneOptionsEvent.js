import MenuEvent from '../MenuEvent';
import OptionsWindow from '../../../editor/window/OptionsWindow';

/**
 * 场景选项事件
 * @author tengge / https://github.com/tengge1
 * @param {*} app 
 */
function SceneOptionsEvent(app) {
    MenuEvent.call(this, app);
}

SceneOptionsEvent.prototype = Object.create(MenuEvent.prototype);
SceneOptionsEvent.prototype.constructor = SceneOptionsEvent;

SceneOptionsEvent.prototype.start = function () {
    var _this = this;
    this.app.on(`mSceneOptions.${this.id}`, this.onOptions.bind(this));
};

SceneOptionsEvent.prototype.stop = function () {
    this.app.on(`mSceneOptions.${this.id}`, null);
};

SceneOptionsEvent.prototype.onOptions = function () {
    var window = UI.get('optionsWindow');
    if (window == null) {
        window = new OptionsWindow({ app: this.app, id: 'optionsWindow' });
        window.render();
    }
    window.show();
    window.changeTab('场景');
};

export default SceneOptionsEvent;