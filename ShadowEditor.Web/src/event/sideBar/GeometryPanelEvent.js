import BaseEvent from '../BaseEvent';
import UI from '../../ui/UI';

import BoxGeometryPanel from '../../editor/sidebar/geometry/BoxGeometryPanel';
import CircleGeometryPanel from '../../editor/sidebar/geometry/CircleGeometryPanel';
import CylinderGeometryPanel from '../../editor/sidebar/geometry/CylinderGeometryPanel';
import IcosahedronGeometryPanel from '../../editor/sidebar/geometry/IcosahedronGeometryPanel';
import LatheGeometryPanel from '../../editor/sidebar/geometry/LatheGeometryPanel';
import PlaneGeometryPanel from '../../editor/sidebar/geometry/PlaneGeometryPanel';
import SphereGeometryPanel from '../../editor/sidebar/geometry/SphereGeometryPanel';
import TorusGeometryPanel from '../../editor/sidebar/geometry/TorusGeometryPanel';
import TorusKnotGeometryPanel from '../../editor/sidebar/geometry/TorusKnotGeometryPanel';

const GeometryPanels = {
    'BoxGeometry': BoxGeometryPanel,
    'BoxBufferGeometry': BoxGeometryPanel,
    'CircleGeometry': CircleGeometryPanel,
    'CircleBufferGeometry': CircleGeometryPanel,
    'CylinderGeometry': CylinderGeometryPanel,
    'CylinderBufferGeometry': CylinderGeometryPanel,
    'IcosahedronGeometry': IcosahedronGeometryPanel,
    'IcosahedronBufferGeometry': IcosahedronGeometryPanel,
    'LatheGeometry': LatheGeometryPanel,
    'LatheBufferGeometry': LatheGeometryPanel,
    'PlaneGeometry': PlaneGeometryPanel,
    'PlaneBufferGeometry': PlaneGeometryPanel,
    'SphereGeometry': SphereGeometryPanel,
    'SphereBufferGeometry': SphereGeometryPanel,
    'TorusGeometry': TorusGeometryPanel,
    'TorusBufferGeometry': TorusGeometryPanel,
    'TorusKnotGeometry': TorusKnotGeometryPanel,
    'TorusKnotBufferGeometry': TorusKnotGeometryPanel
};

/**
 * 物体面板事件
 * @author tengge / https://github.com/tengge1
 * @param {*} app 
 */
function GeometryPanelEvent(app) {
    BaseEvent.call(this, app);
    this.typedGeometryPanel = null;
}

GeometryPanelEvent.prototype = Object.create(BaseEvent.prototype);
GeometryPanelEvent.prototype.constructor = GeometryPanelEvent;

GeometryPanelEvent.prototype.start = function () {
    this.app.on(`objectSelected.${this.id}`, this.update.bind(this));
    this.app.on(`geometryChanged.${this.id}`, this.update.bind(this));
};

GeometryPanelEvent.prototype.stop = function () {
    this.app.on(`objectSelected.${this.id}`, null);
    this.app.on(`geometryChanged.${this.id}`, null);
};

GeometryPanelEvent.prototype.update = function () {
    if (this.app.editor.selected != null) {
        UI.get('geometryPanel').dom.style.display = '';
    } else {
        UI.get('geometryPanel').dom.style.display = 'none';
    }

    var editor = this.app.editor;
    var geometryType = UI.get('geometryType');
    var geometryName = UI.get('geometryName');
    var parameters = UI.get('geometryParameters');

    var object = editor.selected;

    if (object == null || object.geometry == null) {
        return;
    }

    var geometry = object.geometry;

    geometryType.setValue(geometry.type);
    geometryName.setValue(geometry.name);

    parameters.clear();
    parameters.render();

    if (GeometryPanels[geometry.type] !== undefined) {
        if (this.typedGeometryPanel) {
            this.typedGeometryPanel.destroy();
        }
        this.typedGeometryPanel = new GeometryPanels[geometry.type]({ app: this.app, object: object, parent: parameters.dom });
        this.typedGeometryPanel.render();
    }
};

export default GeometryPanelEvent;