import BaseSerializer from '../BaseSerializer';
import MaterialSerializer from './MaterialSerializer';

/**
 * RawShaderMaterialSerializer
 * @author tengge / https://github.com/tengge1
 */
function RawShaderMaterialSerializer() {
    BaseSerializer.call(this);
}

RawShaderMaterialSerializer.prototype = Object.create(BaseSerializer.prototype);
RawShaderMaterialSerializer.prototype.constructor = RawShaderMaterialSerializer;

RawShaderMaterialSerializer.prototype.toJSON = function (obj) {
    return MaterialSerializer.prototype.toJSON.call(this, obj);
};

RawShaderMaterialSerializer.prototype.fromJSON = function (json, parent) {
    var obj = parent === undefined ? new THREE.RawShaderMaterial() : parent;

    MaterialSerializer.prototype.fromJSON.call(this, json, obj);

    return obj;
};

export default RawShaderMaterialSerializer;