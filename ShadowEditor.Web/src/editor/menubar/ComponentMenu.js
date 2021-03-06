import UI from '../../ui/UI';

/**
 * 组件菜单
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function ComponentMenu(options) {
    UI.Control.call(this, options);
    this.app = options.app;
}

ComponentMenu.prototype = Object.create(UI.Control.prototype);
ComponentMenu.prototype.constructor = ComponentMenu;

ComponentMenu.prototype.render = function () {
    var _this = this;

    var container = UI.create({
        xtype: 'div',
        parent: this.parent,
        cls: 'menu',
        children: [{
            xtype: 'div',
            cls: 'title',
            html: '组件'
        }, {
            xtype: 'div',
            cls: 'options',
            children: [{
                xtype: 'div',
                html: '刚体',
                cls: 'option',
                onClick: function () {

                }
            }, {
                xtype: 'div',
                html: '碰撞体',
                cls: 'option',
                onClick: function () {

                }
            }, {
                xtype: 'div',
                html: '粒子发射器',
                cls: 'option',
                onClick: function () {
                    _this.app.call('mParticleEmitter');
                }
            }]
        }]
    });

    container.render();
}

export default ComponentMenu;