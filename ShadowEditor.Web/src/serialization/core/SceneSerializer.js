import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from './Object3DSerializer';
import MaterialsSerializer from '../material/MaterialsSerializer';
import TexturesSerializer from '../texture/TexturesSerializer';

/**
 * SceneSerializer
 * @author tengge / https://github.com/tengge1
 */
function SceneSerializer() {
    BaseSerializer.call(this);
}

SceneSerializer.prototype = Object.create(BaseSerializer.prototype);
SceneSerializer.prototype.constructor = SceneSerializer;

SceneSerializer.prototype.toJSON = function (obj) {
    var json = Object3DSerializer.prototype.toJSON.call(this, obj);

    if (obj.background instanceof THREE.Texture) { // 天空盒和背景图片
        json.background = new TexturesSerializer().toJSON(obj.background);
    } else { // 纯色
        json.background = obj.background;
    }

    json.fog = obj.fog;
    json.overrideMaterial = obj.overrideMaterial == null ? null : (new MaterialsSerializer()).toJSON(obj.overrideMaterial);

    return json;
};

SceneSerializer.prototype.fromJSON = function (json, parent) {
    var obj = parent === undefined ? new THREE.Scene() : parent;

    Object3DSerializer.prototype.fromJSON(json, obj);

    if (json.background.metadata &&
        (json.background.metadata.generator === 'CubeTextureSerializer' ||
            json.background.metadata.generator === 'TextureSerializer')
    ) { // 天空盒和背景图片
        obj.background = new TexturesSerializer().fromJSON(json.background);
    } else { // 纯色
        obj.background = new THREE.Color(json.background);
    }

    if (json.fog && json.fog.type === 'Fog') {
        obj.fog = new THREE.Fog(json.fog.color, json.fog.near, json.fog.far);
    } else if (json.fog && json.fog.type === 'FogExp2') {
        obj.fog = new THREE.FogExp2(json.fog.color, json.fog.density);
    } else if (json.fog) {
        console.warn(`SceneSerializer: unknown fog type ${json.fog.type}.`);
    }

    obj.overrideMaterial = json.overrideMaterial == null ? null : (new MaterialsSerializer()).fromJSON(json.overrideMaterial);

    return obj;
};

export default SceneSerializer;