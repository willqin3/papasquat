/**
 * a HUD container and child items
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
  init: function () {
    // call the constructor
    this._super(me.Container, 'init');

    // persistent across level change
    this.isPersistent = true;

    // make sure we use screen coordinates
    this.floating = true;

    // give a name
    this.name = "HUD";

    // add our child score object
    var texture =  new me.video.renderer.Texture(
            { framewidth: 800, frameheight: 130 },
            me.loader.getImage("NEWS-BOX")
        );
    this.panelSprite = texture.createSpriteFromName(0);
    this.panelSprite.anchorPoint.set(0, -3.6);
    // scale to match the container size
    
    this.addChild(this.panelSprite);
    this.addChild(new game.HUD.ScoreItem(-90, 10));
  }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend( {
  /**
   * constructor
   */
  init : function (x, y) {
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 90, 10]);

    // create the font object
    this.font = new me.Font("Arial", 30, "#FF00FF");

    // font alignment to right, bottom
    this.font.textAlign = "right";
    this.font.textBaseline = "bottom";

    // local copy of the global score
    this.urine = -1;
    this.food = -1;
  },

  /**
   * update function
   */
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the score has been updated
    var changed = false;
    if (this.urine !== game.data.urine) {
      this.urine = game.data.urine;
      changed = true;
    }
    
    if (this.food !== game.data.food) {
      this.food = game.data.food;
      changed = true;
    }
    return changed;
  },

  /**
   * draw the score
   */
  draw : function (renderer) {
        //renderer.fill(me.Rect(me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y,  -this.pos.x, -this.pos.y));
        // this.pos.x, this.pos.y are the relative position from the screen right bottom
		this.font.draw (renderer, "URINE: " + Math.round(game.data.urine), me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y - 30);
		this.font.draw (renderer, "FOOD: " + Math.round(game.data.food), me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y - 70)
  }
});

