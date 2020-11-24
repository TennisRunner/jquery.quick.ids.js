


var proxiedObjects = Array();

function isProxied(el)
{
	return proxiedObjects.indexOf(el) != -1;
}

function ProxyObject(el)
{
	el = new Proxy(el, $MemberHandler);

	proxiedObjects.push(el);

	return el;
}


const $MemberHandler = 
{
	get: function(target, prop, receiver)
	{
		let result = Reflect.get(...arguments);
	
		try
		{
			if(typeof(result) != "undefined")
				throw 0;
				
			if(typeof(prop) != "string")
				throw 0;

			if(prop == "parentNode" || prop == "nodeType" || prop == "nodeType" || prop == "prototype" || prop == "length" || prop == "window")	
				throw 0;

			if(target == $.prototype.constructor)
				result = target("#" + prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());
			else if(target instanceof jQuery)
				result = target.find("#" + prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());

			if(result instanceof jQuery == true)
			{
				if(result.length == 0)
					result = null;
				else if(isProxied(result) == false)
					result = ProxyObject(result);
			}
		}
		catch(err)
		{

		}

		return result;
	}
};




let originalFind = jQuery.fn.find; 

jQuery.fn.extend(
{
	find: function(...args)
	{
		let results = originalFind.bind(this)(...args);

		if(isProxied(results) == false)
		{
			results = ProxyObject(results);
		}
		
		return results;
	}
});


$ = new Proxy($, $MemberHandler);


$.fn.prep = function(cb)
{
	cb.bind(this)();
}