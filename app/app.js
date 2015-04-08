import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

App.Diving = Ember.Object.extend({
    Depth : "",
    Time : ""
});

App.IndexRoute = Ember.Route.extend({
  dive: function(){
      return App.Diving.create()
  },
    setupController : function(controller, dive){
        controller.set("model", dive);
    }
});

App.IndexController = Ember.ObjectController.extend({
    submitAction : function(){
        // here you could perform your actions like persisting to the server or so
        alert("now we can submit the model:" + this.get("model"));
    }
});

App.AppsController = Ember.ArrayController.extend({
	actions: {
		
	
	}
});

loadInitializers(App, config.modulePrefix);

/*App.ClickableView = Ember.View.extend({
  click: function(evt) {
	
  }
});*/

export default App;
