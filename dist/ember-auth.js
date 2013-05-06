// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(Em, 'Auth', get$(Em, 'Object').extend(get$(Em, 'Evented'), {
  init: function () {
    null != get$(this, '_request') || set$(this, '_request', get$(get$(Em, 'Auth'), 'Request').create({ auth: this }));
    null != get$(this, '_response') || set$(this, '_response', get$(get$(Em, 'Auth'), 'Response').create({ auth: this }));
    null != get$(this, '_strategy') || set$(this, '_strategy', get$(get$(Em, 'Auth'), 'Strategy').create({ auth: this }));
    null != get$(this, '_session') || set$(this, '_session', get$(get$(Em, 'Auth'), 'Session').create({ auth: this }));
    return null != get$(this, '_module') || set$(this, '_module', get$(get$(Em, 'Auth'), 'Module').create({ auth: this }));
  },
  trigger: function () {
    get$(this, 'syncEvent').apply(this, arguments);
    return this._super.apply(this, arguments);
  },
  syncEvent: function () {
    get$(get$(this, '_request'), 'syncEvent').apply(get$(this, '_request'), arguments);
    get$(get$(this, '_response'), 'syncEvent').apply(get$(this, '_response'), arguments);
    get$(get$(this, '_strategy'), 'syncEvent').apply(get$(this, '_strategy'), arguments);
    get$(get$(this, '_session'), 'syncEvent').apply(get$(this, '_session'), arguments);
    return get$(get$(this, '_module'), 'syncEvent').apply(get$(this, '_module'), arguments);
  },
  requestAdapter: 'jquery',
  responseAdapter: 'json',
  strategyAdapter: 'token',
  sessionAdapter: 'cookie',
  modules: ['emberData'],
  signInEndPoint: null,
  signOutEndPoint: null,
  baseUrl: null,
  userModel: null,
  tokenKey: null,
  tokenIdKey: null,
  tokenLocation: 'param',
  tokenHeaderKey: null,
  rememberable: {
    tokenKey: null,
    period: 14,
    autoRecall: true
  },
  urlAuthenticatable: { paramsKey: null },
  authRedirectable: { route: null },
  actionRedirectable: {
    signInRoute: false,
    signOutRoute: false,
    signInSmart: false,
    signOutSmart: false,
    signInBlacklist: [],
    signOutBlacklist: []
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(Em, 'Auth'), 'Request', Ember.Object.extend({
  init: function () {
    var adapter;
    if (!(null != get$(this, 'adapter'))) {
      adapter = get$(Em, 'String').classify(get$(get$(this, 'auth'), 'requestAdapter'));
      if (null != get$(get$(Em, 'Auth'), 'Request')[adapter]) {
        set$(this, 'adapter', get$(get$(Em, 'Auth'), 'Request')[adapter].create({ auth: get$(this, 'auth') }));
      } else {
        throw 'Adapter not found: Em.Auth.Request.' + adapter;
      }
    }
    return this.inject();
  },
  syncEvent: function () {
    if (null != get$(get$(this, 'adapter'), 'syncEvent'))
      return get$(get$(this, 'adapter'), 'syncEvent').apply(get$(this, 'adapter'), arguments);
  },
  signIn: function (opts) {
    var url;
    url = this.resolveUrl(get$(get$(this, 'auth'), 'signInEndPoint'));
    return get$(this, 'adapter').signIn(url, get$(get$(this, 'auth'), '_strategy').serialize(opts));
  },
  signOut: function (opts) {
    var url;
    url = this.resolveUrl(get$(get$(this, 'auth'), 'signOutEndPoint'));
    return get$(this, 'adapter').signOut(url, get$(get$(this, 'auth'), '_strategy').serialize(opts));
  },
  send: function (opts) {
    return get$(this, 'adapter').send(get$(get$(this, 'auth'), '_strategy').serialize(opts));
  },
  resolveUrl: function (path) {
    var base;
    base = get$(get$(this, 'auth'), 'baseUrl');
    if (base && base[get$(base, 'length') - 1] === '/')
      base = base.substr(0, get$(base, 'length') - 1);
    if ((null != path ? path[0] : void 0) === '/')
      path = path.substr(1, get$(path, 'length'));
    return [
      base,
      path
    ].join('/');
  },
  inject: function () {
    var this$, this$1, this$2;
    return get$(this, 'auth').reopen({
      signIn: (this$ = this, function (opts) {
        return this$.signIn(opts);
      }),
      signOut: (this$1 = this, function (opts) {
        return this$1.signOut(opts);
      }),
      send: (this$2 = this, function (opts) {
        return this$2.send(opts);
      })
    });
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Request'), 'Dummy', Ember.Object.extend({
  signIn: function (url, opts) {
    if (null == opts)
      opts = {};
    this.send(opts);
    switch (get$(opts, 'status')) {
    case 'success':
      get$(this, 'auth').trigger('signInsuccess');
      break;
    case 'error':
      get$(this, 'auth').trigger('signInError');
    }
    return get$(this, 'auth').trigger('signInComplete');
  },
  signOut: function (url, opts) {
    if (null == opts)
      opts = {};
    this.send(opts);
    switch (get$(opts, 'status')) {
    case 'success':
      get$(this, 'auth').trigger('signOutsuccess');
      break;
    case 'error':
      get$(this, 'auth').trigger('signOutError');
    }
    return get$(this, 'auth').trigger('signOutComplete');
  },
  send: function (opts) {
    if (null == opts)
      opts = {};
    return get$(get$(this, 'auth'), '_response').canonicalize(opts);
  }
}));// Generated by EmberScript 0.0.7
void function () {
  var $;
  var get$ = Ember.get;
  var set$ = Ember.set;
  $ = jQuery;
  set$(get$(get$(Em, 'Auth'), 'Request'), 'Jquery', Ember.Object.extend({
    init: function () {
      null != get$(this, 'jqxhr') || set$(this, 'jqxhr', null);
      return this.inject();
    },
    signIn: function (url, opts) {
      var this$, this$1, this$2;
      if (null == opts)
        opts = {};
      return this.send($.extend(true, {
        url: url,
        type: 'POST'
      }, opts)).done((this$ = this, function () {
        return get$(this$, 'auth').trigger('signInSuccess');
      })).fail((this$1 = this, function () {
        return get$(this$1, 'auth').trigger('signInError');
      })).always((this$2 = this, function () {
        return get$(this$2, 'auth').trigger('signInComplete');
      }));
    },
    signOut: function (url, opts) {
      var this$, this$1, this$2;
      if (null == opts)
        opts = {};
      return this.send($.extend(true, {
        url: url,
        type: 'DELETE'
      }, opts)).done((this$ = this, function () {
        return get$(this$, 'auth').trigger('signOutSuccess');
      })).fail((this$1 = this, function () {
        return get$(this$1, 'auth').trigger('signOutError');
      })).always((this$2 = this, function () {
        return get$(this$2, 'auth').trigger('signOutComplete');
      }));
    },
    send: function (settings) {
      var def, this$, this$1, this$2;
      if (null == settings)
        settings = {};
      def = {};
      set$(def, 'dataType', 'json');
      if (get$(settings, 'data') && !(null != get$(settings, 'contentType')))
        if ((null != get$(settings, 'type') ? get$(settings, 'type').toUpperCase() : void 0) !== 'GET') {
          set$(def, 'contentType', 'application/json; charset=utf-8');
          set$(settings, 'data', JSON.stringify(get$(settings, 'data')));
        }
      settings = $.extend(def, settings);
      return $.ajax(settings).done((this$ = this, function (json, status, jqxhr) {
        get$(get$(this$, 'auth'), '_response').canonicalize(json);
        return set$(this$, 'jqxhr', jqxhr);
      })).fail((this$1 = this, function (jqxhr) {
        get$(get$(this$1, 'auth'), '_response').canonicalize(get$(jqxhr, 'responseText'));
        return set$(this$1, 'jqxhr', jqxhr);
      })).always((this$2 = this, function (jqxhr) {
        return set$(this$2, 'jqxhr', jqxhr);
      }));
    },
    inject: function () {
      var this$;
      return get$(this, 'auth').reopen({
        jqxhr: Em.computed((this$ = this, function () {
          return get$(this$, 'jqxhr');
        })).property('_request.adapter.jqxhr')
      });
    }
  }));
}.call(this);// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(Em, 'Auth'), 'Response', Ember.Object.extend({
  init: function () {
    var adapter;
    null != get$(this, 'response') || set$(this, 'response', {});
    if (!(null != get$(this, 'adapter'))) {
      adapter = get$(Em, 'String').classify(get$(get$(this, 'auth'), 'responseAdapter'));
      if (null != get$(get$(Em, 'Auth'), 'Response')[adapter]) {
        set$(this, 'adapter', get$(get$(Em, 'Auth'), 'Response')[adapter].create({ auth: get$(this, 'auth') }));
      } else {
        throw 'Adapter not found: Em.Auth.Response.' + adapter;
      }
    }
    return this.inject();
  },
  syncEvent: function () {
    if (null != get$(get$(this, 'adapter'), 'syncEvent'))
      return get$(get$(this, 'adapter'), 'syncEvent').apply(get$(this, 'adapter'), arguments);
  },
  canonicalize: function (input) {
    return set$(this, 'response', get$(this, 'adapter').canonicalize(input));
  },
  inject: function () {
    var this$;
    return get$(this, 'auth').reopen({
      response: Em.computed((this$ = this, function () {
        return get$(this$, 'response');
      })).property('_response.response')
    });
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Response'), 'Dummy', Ember.Object.extend({
  canonicalize: function (input) {
    return input;
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Response'), 'Json', Ember.Object.extend({
  canonicalize: function (input) {
    switch (typeof input) {
    case 'object':
      return input;
    case 'string':
      return JSON.parse(input);
    default:
      throw 'Invalid JSON format';
    }
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(Em, 'Auth'), 'Strategy', Ember.Object.extend({
  init: function () {
    var adapter;
    if (!(null != get$(this, 'adapter'))) {
      adapter = get$(Em, 'String').classify(get$(get$(this, 'auth'), 'strategyAdapter'));
      if (null != get$(get$(Em, 'Auth'), 'Strategy')[adapter]) {
        return set$(this, 'adapter', get$(get$(Em, 'Auth'), 'Strategy')[adapter].create({ auth: get$(this, 'auth') }));
      } else {
        throw 'Adapter not found: Em.Auth.Strategy.' + adapter;
      }
    }
  },
  syncEvent: function (name, args) {
    args = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
    switch (name) {
    case 'signInSuccess':
      this.deserialize();
    }
    if (null != get$(get$(this, 'adapter'), 'syncEvent'))
      return get$(get$(this, 'adapter'), 'syncEvent').apply(get$(this, 'adapter'), arguments);
  },
  serialize: function (opts) {
    return get$(this, 'adapter').serialize(opts);
  },
  deserialize: function () {
    return get$(this, 'adapter').deserialize(get$(get$(this, 'auth'), 'response'));
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Strategy'), 'Dummy', Ember.Object.extend({
  serialize: function (opts) {
    if (null == opts)
      opts = {};
    return opts;
  },
  deserialize: function (data) {
    if (null == data)
      data = {};
    return function (accum$) {
      var k, v;
      for (k in data) {
        v = data[k];
        accum$.push(get$(this, 'auth').set(k, v));
      }
      return accum$;
    }.call(this, []);
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Strategy'), 'Token', Ember.Object.extend({
  init: function () {
    null != get$(this, 'authToken') || set$(this, 'authToken', null);
    return this.inject();
  },
  serialize: function (opts) {
    if (null == opts)
      opts = {};
    if (!get$(get$(this, 'auth'), 'signedIn'))
      return opts;
    switch (get$(get$(this, 'auth'), 'tokenLocation')) {
    case 'param':
      opts.data || (opts.data = {});
      if (FormData && get$(opts, 'data') instanceof FormData) {
        get$(opts, 'data').append(get$(get$(this, 'auth'), 'tokenKey'), get$(this, 'authToken'));
      } else {
        get$(opts, 'data')[get$(get$(this, 'auth'), 'tokenKey')] || (get$(opts, 'data')[get$(get$(this, 'auth'), 'tokenKey')] = get$(this, 'authToken'));
      }
      break;
    case 'authHeader':
      opts.headers || (opts.headers = {});
      get$(opts, 'headers').Authorization || (get$(opts, 'headers').Authorization = '' + get$(get$(this, 'auth'), 'tokenHeaderKey') + ' ' + get$(this, 'authToken'));
      break;
    case 'customHeader':
      opts.headers || (opts.headers = {});
      get$(opts, 'headers')[get$(get$(this, 'auth'), 'tokenHeaderKey')] || (get$(opts, 'headers')[get$(get$(this, 'auth'), 'tokenHeaderKey')] = get$(this, 'authToken'));
    }
    return opts;
  },
  deserialize: function (data) {
    if (null == data)
      data = {};
    set$(this, 'authToken', data[get$(get$(this, 'auth'), 'tokenKey')]);
    if (get$(get$(this, 'auth'), 'tokenIdKey'))
      return set$(get$(get$(this, 'auth'), '_session'), 'userId', data[get$(get$(this, 'auth'), 'tokenIdKey')]);
  },
  inject: function () {
    var this$;
    return get$(this, 'auth').reopen({
      authToken: Em.computed((this$ = this, function () {
        return get$(this$, 'authToken');
      })).property('_strategy.adapter.authToken')
    });
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(Em, 'Auth'), 'Session', Ember.Object.extend({
  init: function () {
    var adapter, this$, this$1;
    null != get$(this, 'signedIn') || set$(this, 'signedIn', false);
    null != get$(this, 'userId') || set$(this, 'userId', null);
    null != get$(this, 'user') || set$(this, 'user', null);
    if (!(null != get$(this, 'adapter'))) {
      adapter = get$(Em, 'String').classify(get$(get$(this, 'auth'), 'sessionAdapter'));
      if (null != get$(get$(Em, 'Auth'), 'Session')[adapter]) {
        set$(this, 'adapter', get$(get$(Em, 'Auth'), 'Session')[adapter].create({ auth: get$(this, 'auth') }));
      } else {
        throw 'Adapter not found: Em.Auth.Session.' + adapter;
      }
    }
    get$(this, 'auth').on('signInSuccess', (this$ = this, function () {
      return this$.start();
    }));
    get$(this, 'auth').on('signOutSuccess', (this$1 = this, function () {
      return this$1.clear();
    }));
    return this.inject();
  },
  syncEvent: function (name, args) {
    args = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
    switch (name) {
    case 'signInSuccess':
      this.findUser();
    }
    if (null != get$(get$(this, 'adapter'), 'syncEvent'))
      return get$(get$(this, 'adapter'), 'syncEvent').apply(get$(this, 'adapter'), arguments);
  },
  findUser: Ember.observer(function () {
    var model, modelKey;
    if (!(get$(this, 'signedIn') && get$(this, 'userId')))
      return;
    if ((modelKey = get$(get$(this, 'auth'), 'userModel')) && (model = Ember.get(modelKey)))
      return set$(this, 'user', model.find(get$(this, 'userId')));
  }, 'signedIn', 'userId'),
  start: function () {
    return set$(this, 'signedIn', true);
  },
  clear: function () {
    set$(this, 'signedIn', false);
    set$(this, 'userId', null);
    return set$(this, 'user', null);
  },
  retrieve: function (key, opts) {
    return get$(this, 'adapter').retrieve(key, opts);
  },
  store: function (key, value, opts) {
    return get$(this, 'adapter').store(key, value, opts);
  },
  remove: function (key, opts) {
    return get$(this, 'adapter').remove(key, opts);
  },
  inject: function () {
    var this$, this$1, this$2;
    return get$(this, 'auth').reopen({
      signedIn: Em.computed((this$ = this, function () {
        return get$(this$, 'signedIn');
      })).property('_session.signedIn'),
      userId: Em.computed((this$1 = this, function () {
        return get$(this$1, 'userId');
      })).property('_session.userId'),
      user: Em.computed((this$2 = this, function () {
        return get$(this$2, 'user');
      })).property('_session.user')
    });
  }
}));/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

(function (factory) {
	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			$.cookie(key, '', $.extend(options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));
// Generated by EmberScript 0.0.7
void function () {
  var $;
  var get$ = Ember.get;
  var set$ = Ember.set;
  $ = jQuery;
  set$(get$(get$(Em, 'Auth'), 'Session'), 'Cookie', Ember.Object.extend({
    retrieve: function (key, opts) {
      return $.cookie(key);
    },
    store: function (key, value, opts) {
      return $.cookie(key, value, $.extend(true, { path: '/' }, opts));
    },
    remove: function (key, opts) {
      return $.removeCookie(key, $.extend(true, { path: '/' }, opts));
    }
  }));
}.call(this);// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Session'), 'Dummy', Ember.Object.extend({
  init: function () {
    return set$(this, 'session', {});
  },
  retrieve: function (key) {
    return this.get('session.' + key);
  },
  store: function (key, value) {
    return this.set('session.' + key, value);
  },
  remove: function (key) {
    return delete get$(this, 'session')[key];
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Session'), 'LocalStorage', Ember.Object.extend({
  retrieve: function (key) {
    return localStorage.getItem(key);
  },
  store: function (key, value) {
    return localStorage.setItem(key, value);
  },
  remove: function (key) {
    return localStorage.removeItem(key);
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(Em, 'Auth'), 'Module', Ember.Object.extend({
  init: function () {
    var key, module;
    if (!(null != get$(this, 'module'))) {
      set$(this, 'module', {});
      for (var i$ = 0, length$ = get$(get$(this, 'auth'), 'modules').length; i$ < length$; ++i$) {
        key = get$(get$(this, 'auth'), 'modules')[i$];
        key = get$(Em, 'String').camelize(key);
        module = get$(Em, 'String').classify(key);
        if (null != get$(get$(Em, 'Auth'), 'Module')[module]) {
          this.set('module.' + key, get$(get$(Em, 'Auth'), 'Module')[module].create({ auth: get$(this, 'auth') }));
        } else {
          throw 'Module not found: Em.Auth.Module.' + module;
        }
      }
    }
    return this.inject();
  },
  syncEvent: function () {
    var args;
    args = arguments;
    return function (accum$) {
      var _, module;
      for (_ in get$(this, 'module')) {
        module = get$(this, 'module')[_];
        accum$.push(null != get$(module, 'syncEvent') ? get$(module, 'syncEvent').apply(module, args) : void 0);
      }
      return accum$;
    }.call(this, []);
  },
  inject: function () {
    var this$;
    return get$(this, 'auth').reopen({
      module: Em.computed((this$ = this, function () {
        return get$(this$, 'module');
      })).property('_module.module')
    });
  }
}));// Generated by EmberScript 0.0.7
void function () {
  var $;
  var get$ = Ember.get;
  var set$ = Ember.set;
  $ = jQuery;
  set$(get$(get$(Em, 'Auth'), 'Module'), 'ActionRedirectable', Ember.Object.extend({
    init: function () {
      null != get$(this, 'config') || set$(this, 'config', get$(get$(this, 'auth'), 'actionRedirectable'));
      null != get$(this, 'initPath') || set$(this, 'initPath', null);
      null != get$(this, 'isInit') || set$(this, 'isInit', true);
      null != get$(this, 'signInRedir') || set$(this, 'signInRedir', null);
      null != get$(this, 'signOutRedir') || set$(this, 'signOutRedir', null);
      null != get$(this, 'router') || set$(this, 'router', null);
      return this.patch();
    },
    canonicalizeRoute: function (route) {
      var endsWith;
      if (!(typeof route === 'string'))
        return '';
      endsWith = function (haystack, needle) {
        var d;
        d = get$(haystack, 'length') - get$(needle, 'length');
        return d >= 0 && haystack.lastIndexOf(needle) === d;
      };
      if (!endsWith(route, '.index'))
        return route;
      return route.substr(0, route.lastIndexOf('.index'));
    },
    getBlacklist: function (env) {
      var blacklist;
      if (!(blacklist = get$(this, 'config')['' + env + 'Blacklist']))
        return [];
      return function (accum$) {
        var r;
        for (var i$ = 0, length$ = blacklist.length; i$ < length$; ++i$) {
          r = blacklist[i$];
          accum$.push(this.canonicalizeRoute(r));
        }
        return accum$;
      }.call(this, []);
    },
    resolveRedirect: function (env) {
      var fallback, isSmart;
      if (!(env === 'signIn' || env === 'signOut'))
        return null;
      isSmart = get$(this, 'config')['' + env + 'Smart'];
      fallback = this.canonicalizeRoute(get$(this, 'config')['' + env + 'Route']);
      if (!fallback)
        return null;
      if (!isSmart)
        return [fallback];
      return this.get('' + env + 'Redir') || get$(this, 'initPath');
    },
    registerInitRedirect: function (routeName) {
      if (!get$(this, 'isInit'))
        return;
      routeName = this.canonicalizeRoute(routeName);
      return function (accum$) {
        var env;
        for (var cache$ = [
              'signIn',
              'signOut'
            ], i$ = 0, length$ = cache$.length; i$ < length$; ++i$) {
          env = cache$[i$];
          this.set('' + env + 'Redir', null);
          accum$.push($.inArray(routeName, this.getBlacklist(env)) !== -1 ? this.set('' + env + 'Redir', [get$(this, 'config')['' + env + 'Route']]) : void 0);
        }
        return accum$;
      }.call(this, []);
    },
    registerRedirect: function (args) {
      var routeName;
      routeName = this.canonicalizeRoute(args[0]);
      set$(this, 'isInit', false);
      if ($.inArray(routeName, this.getBlacklist('signIn')) === -1)
        set$(this, 'signInRedir', args);
      if ($.inArray(routeName, this.getBlacklist('signOut')) === -1)
        return set$(this, 'signOutRedir', args);
    },
    redirect: Ember.observer(function () {
      var env, result;
      env = get$(get$(this, 'auth'), 'signedIn') ? 'signIn' : 'signOut';
      if (!(result = this.resolveRedirect(env)))
        return;
      switch (typeof result) {
      case 'object':
        return get$(get$(this, 'router'), 'transitionTo').apply(this, result);
      case 'string':
        get$(get$(this, 'router'), 'location').setURL(result);
        return get$(this, 'router').handleURL(result);
      }
    }, 'auth.signedIn'),
    patch: function () {
      var self;
      self = this;
      get$(Em, 'Route').reopen({
        activate: function () {
          this._super.apply(this, arguments);
          self.router || (self.router = get$(this, 'router'));
          return self.registerInitRedirect(get$(this, 'routeName'));
        }
      });
      return get$(Em, 'Router').reopen({
        init: function () {
          this._super.apply(this, arguments);
          return self.initPath || (self.initPath = get$(this, 'location').getURL());
        },
        transitionTo: function () {
          var args;
          args = Array.prototype.slice.call(arguments);
          self.registerRedirect(args);
          return this._super.apply(this, args);
        },
        replaceWith: function () {
          var args;
          args = Array.prototype.slice.call(arguments);
          self.registerRedirect(args);
          return this._super.apply(this, args);
        }
      });
    }
  }));
}.call(this);// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Module'), 'AuthRedirectable', Ember.Object.extend({
  init: function () {
    null != get$(this, 'config') || set$(this, 'config', get$(get$(this, 'auth'), 'authRedirectable'));
    return this.patch();
  },
  patch: function () {
    var self;
    self = this;
    set$(this, 'AuthRedirectable', Ember.Mixin.create({
      redirect: function () {
        this._super.apply(this, arguments);
        if (!get$(get$(self, 'auth'), 'signedIn')) {
          get$(self, 'auth').trigger('authAccess');
          return this.transitionTo(get$(get$(self, 'config'), 'route'));
        }
      }
    }));
    return set$(get$(this, 'auth'), 'AuthRedirectable', get$(this, 'AuthRedirectable'));
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Module'), 'EmberData', Ember.Object.extend({
  init: function () {
    return this.patch();
  },
  patch: function () {
    var self;
    self = this;
    if ('undefined' !== typeof DS && null != DS && null != get$(DS, 'RESTAdapter'))
      return get$(DS, 'RESTAdapter').reopen({
        ajax: function (url, type, settings) {
          settings || (settings = {});
          set$(settings, 'url', url);
          set$(settings, 'type', type);
          set$(settings, 'context', this);
          return get$(get$(self, 'auth'), '_request').send(settings);
        }
      });
  }
}));// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
set$(get$(get$(Em, 'Auth'), 'Module'), 'Rememberable', Ember.Object.extend({
  init: function () {
    null != get$(this, 'config') || set$(this, 'config', get$(get$(this, 'auth'), 'rememberable'));
    return this.patch();
  },
  syncEvent: function (name, args) {
    args = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
    switch (name) {
    case 'signInSuccess':
      return this.remember();
    case 'signInError':
      return this.forget();
    case 'signOutSuccess':
      return this.forget();
    }
  },
  recall: function (opts) {
    var token;
    if (null == opts)
      opts = {};
    if (!get$(get$(this, 'auth'), 'signedIn') && (token = this.retrieveToken())) {
      set$(this, 'fromRecall', true);
      opts.data || (opts.data = {});
      get$(opts, 'data')[get$(get$(this, 'config'), 'tokenKey')] = token;
      return get$(this, 'auth').signIn(opts);
    }
  },
  remember: function () {
    var token;
    if (token = null != get$(get$(this, 'auth'), 'response') ? get$(get$(this, 'auth'), 'response')[get$(get$(this, 'config'), 'tokenKey')] : void 0) {
      if (!(token === this.retrieveToken())) {
        this.storeToken(token);
      }
    } else if (!get$(this, 'fromRecall')) {
      this.forget();
    }
    return set$(this, 'fromRecall', false);
  },
  forget: function () {
    return this.removeToken();
  },
  retrieveToken: function () {
    return get$(get$(this, 'auth'), '_session').retrieve('ember-auth-rememberable');
  },
  storeToken: function (token) {
    return get$(get$(this, 'auth'), '_session').store('ember-auth-rememberable', token, { expires: get$(get$(this, 'config'), 'period') });
  },
  removeToken: function () {
    return get$(get$(this, 'auth'), '_session').remove('ember-auth-rememberable');
  },
  patch: function () {
    var self;
    self = this;
    return get$(Em, 'Route').reopen({
      redirect: function () {
        this._super.apply(this, arguments);
        if (get$(get$(self, 'config'), 'autoRecall') && !get$(get$(self, 'auth'), 'signedIn'))
          return self.recall({ async: false });
      }
    });
  }
}));/*
 * JQuery URL Parser plugin, v2.2.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */
 

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD available; use anonymous module
		if ( typeof jQuery !== 'undefined' ) {
			define(['jquery'], factory);	
		} else {
			define([], factory);
		}
	} else {
		// No AMD available; mutate global vars
		if ( typeof jQuery !== 'undefined' ) {
			factory(jQuery);
		} else {
			factory();
		}
	}
})(function($, undefined) {
	
	var tag2attr = {
			a       : 'href',
			img     : 'src',
			form    : 'action',
			base    : 'href',
			script  : 'src',
			iframe  : 'src',
			link    : 'href'
		},
		
		key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query
		
		aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability
		
		parser = {
			strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
			loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
		},
		
		toString = Object.prototype.toString,
		
		isint = /^[0-9]+$/;
	
	function parseUri( url, strictMode ) {
		var str = decodeURI( url ),
		res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
		uri = { attr : {}, param : {}, seg : {} },
		i   = 14;
		
		while ( i-- ) {
			uri.attr[ key[i] ] = res[i] || '';
		}
		
		// build query and fragment parameters		
		uri.param['query'] = parseString(uri.attr['query']);
		uri.param['fragment'] = parseString(uri.attr['fragment']);
		
		// split path and fragement into segments		
		uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');     
		uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
		
		// compile a 'base' domain attribute        
		uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';      
		  
		return uri;
	};
	
	function getAttrName( elm ) {
		var tn = elm.tagName;
		if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
		return tn;
	}
	
	function promote(parent, key) {
		if (parent[key].length == 0) return parent[key] = {};
		var t = {};
		for (var i in parent[key]) t[i] = parent[key][i];
		parent[key] = t;
		return t;
	}

	function parse(parts, parent, key, val) {
		var part = parts.shift();
		if (!part) {
			if (isArray(parent[key])) {
				parent[key].push(val);
			} else if ('object' == typeof parent[key]) {
				parent[key] = val;
			} else if ('undefined' == typeof parent[key]) {
				parent[key] = val;
			} else {
				parent[key] = [parent[key], val];
			}
		} else {
			var obj = parent[key] = parent[key] || [];
			if (']' == part) {
				if (isArray(obj)) {
					if ('' != val) obj.push(val);
				} else if ('object' == typeof obj) {
					obj[keys(obj).length] = val;
				} else {
					obj = parent[key] = [parent[key], val];
				}
			} else if (~part.indexOf(']')) {
				part = part.substr(0, part.length - 1);
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
				// key
			} else {
				if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
				parse(parts, obj, part, val);
			}
		}
	}

	function merge(parent, key, val) {
		if (~key.indexOf(']')) {
			var parts = key.split('['),
			len = parts.length,
			last = len - 1;
			parse(parts, parent, 'base', val);
		} else {
			if (!isint.test(key) && isArray(parent.base)) {
				var t = {};
				for (var k in parent.base) t[k] = parent.base[k];
				parent.base = t;
			}
			set(parent.base, key, val);
		}
		return parent;
	}

	function parseString(str) {
		return reduce(String(str).split(/&|;/), function(ret, pair) {
			try {
				pair = decodeURIComponent(pair.replace(/\+/g, ' '));
			} catch(e) {
				// ignore
			}
			var eql = pair.indexOf('='),
				brace = lastBraceInKey(pair),
				key = pair.substr(0, brace || eql),
				val = pair.substr(brace || eql, pair.length),
				val = val.substr(val.indexOf('=') + 1, val.length);

			if ('' == key) key = pair, val = '';

			return merge(ret, key, val);
		}, { base: {} }).base;
	}
	
	function set(obj, key, val) {
		var v = obj[key];
		if (undefined === v) {
			obj[key] = val;
		} else if (isArray(v)) {
			v.push(val);
		} else {
			obj[key] = [v, val];
		}
	}
	
	function lastBraceInKey(str) {
		var len = str.length,
			 brace, c;
		for (var i = 0; i < len; ++i) {
			c = str[i];
			if (']' == c) brace = false;
			if ('[' == c) brace = true;
			if ('=' == c && !brace) return i;
		}
	}
	
	function reduce(obj, accumulator){
		var i = 0,
			l = obj.length >> 0,
			curr = arguments[2];
		while (i < l) {
			if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
			++i;
		}
		return curr;
	}
	
	function isArray(vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	}
	
	function keys(obj) {
		var keys = [];
		for ( prop in obj ) {
			if ( obj.hasOwnProperty(prop) ) keys.push(prop);
		}
		return keys;
	}
		
	function purl( url, strictMode ) {
		if ( arguments.length === 1 && url === true ) {
			strictMode = true;
			url = undefined;
		}
		strictMode = strictMode || false;
		url = url || window.location.toString();
	
		return {
			
			data : parseUri(url, strictMode),
			
			// get various attributes from the URI
			attr : function( attr ) {
				attr = aliases[attr] || attr;
				return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
			},
			
			// return query string parameters
			param : function( param ) {
				return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
			},
			
			// return fragment parameters
			fparam : function( param ) {
				return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
			},
			
			// return path segments
			segment : function( seg ) {
				if ( typeof seg === 'undefined' ) {
					return this.data.seg.path;
				} else {
					seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.path[seg];                    
				}
			},
			
			// return fragment segments
			fsegment : function( seg ) {
				if ( typeof seg === 'undefined' ) {
					return this.data.seg.fragment;                    
				} else {
					seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
					return this.data.seg.fragment[seg];                    
				}
			}
	    	
		};
	
	};
	
	if ( typeof $ !== 'undefined' ) {
		
		$.fn.url = function( strictMode ) {
			var url = '';
			if ( this.length ) {
				url = $(this).attr( getAttrName(this[0]) ) || '';
			}    
			return purl( url, strictMode );
		};
		
		$.url = purl;
		
	} else {
		window.purl = purl;
	}

});

// Generated by EmberScript 0.0.7
void function () {
  var $;
  var get$ = Ember.get;
  var set$ = Ember.set;
  $ = jQuery;
  set$(get$(get$(Em, 'Auth'), 'Module'), 'UrlAuthenticatable', Ember.Object.extend({
    init: function () {
      null != get$(this, 'params') || set$(this, 'params', {});
      null != get$(this, 'config') || set$(this, 'config', get$(get$(this, 'auth'), 'urlAuthenticatable'));
      return this.patch();
    },
    authenticate: function (opts) {
      if (null == opts)
        opts = {};
      if (get$(get$(this, 'auth'), 'signedIn'))
        return;
      this.canonicalizeParams();
      if ($.isEmptyObject(get$(this, 'params')))
        return;
      set$(opts, 'data', $.extend(true, get$(this, 'params'), get$(opts, 'data') || {}));
      return get$(this, 'auth').signIn(opts);
    },
    retrieveParams: function () {
      return set$(this, 'params', $.url().param(get$(get$(this, 'config'), 'paramsKey')));
    },
    canonicalizeParams: function (obj) {
      var canonicalized, k, params, v;
      if (null == obj)
        obj = get$(this, 'params');
      params = {};
      if (!(null != obj)) {
        params = {};
      } else if ($.isArray(obj)) {
        for (var i$ = 0, length$ = obj.length; i$ < length$; ++i$) {
          v = obj[i$];
          k = i$;
          params[k] = v;
        }
      } else if (typeof obj !== 'object') {
        params[String(obj)] = String(obj);
      } else {
        params = obj;
      }
      canonicalized = {};
      for (k in params) {
        v = params[k];
        k = String(k);
        if (k && k.charAt(get$(k, 'length') - 1) === '/')
          k = k.slice(0, -1);
        if (typeof v === 'object') {
          canonicalized[k] = this.canonicalizeParams(v);
        } else {
          v = String(v);
          if (v && v.charAt(get$(v, 'length') - 1) === '/')
            v = v.slice(0, -1);
          canonicalized[k] = v;
        }
      }
      return set$(this, 'params', canonicalized);
    },
    patch: function () {
      var self;
      self = this;
      get$(Em, 'Route').reopen({
        redirect: function () {
          this._super.apply(this, arguments);
          return self.authenticate({ async: false });
        }
      });
      return get$(Em, 'Router').reopen({
        init: function () {
          self.retrieveParams();
          return this._super.apply(this, arguments);
        }
      });
    }
  }));
}.call(this);