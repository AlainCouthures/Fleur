var Fleur = {};

(function() {
"use strict";

Fleur.TypeInfo = function() {};
Fleur.TypeInfo.DERIVATION_RESTRICTION = 1;
Fleur.TypeInfo.DERIVATION_EXTENSION = 2;
Fleur.TypeInfo.DERIVATION_UNION = 4;
Fleur.TypeInfo.DERIVATION_LIST = 8;
/* 
Fleur.TypeInfo.prototype.isDerivedFrom = function(typeNamespaceArg, typeNameArg, derivationMethod) {
};
*/

Fleur.UserDataHandler = function() {};
Fleur.UserDataHandler.NODE_CLONED = 1;
Fleur.UserDataHandler.NODE_IMPORTED = 2;
Fleur.UserDataHandler.NODE_DELETED = 3;
Fleur.UserDataHandler.NODE_RENAMED = 4;
Fleur.UserDataHandler.NODE_ADOPTED = 5;
/*
Fleur.UserDataHandler.prototype.handle = function(operation, key, data, src, dst) {
};
*/

Fleur.DOMException = function(code) {
	this.code = code;
};
Fleur.DOMException.INDEX_SIZE_ERR = 1;
Fleur.DOMException.DOMSTRING_SIZE_ERR = 2;
Fleur.DOMException.HIERARCHY_REQUEST_ERR = 3;
Fleur.DOMException.WRONG_DOCUMENT_ERR = 4;
Fleur.DOMException.INVALID_CHARACTER_ERR = 5;
Fleur.DOMException.NO_DATA_ALLOWED_ERR = 6;
Fleur.DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;
Fleur.DOMException.NOT_FOUND_ERR = 8;
Fleur.DOMException.NOT_SUPPORTED_ERR = 9;
Fleur.DOMException.INUSE_ATTRIBUTE_ERR = 10;
Fleur.DOMException.INVALID_STATE_ERR = 11;
Fleur.DOMException.SYNTAX_ERR = 12;
Fleur.DOMException.INVALID_MODIFICATION_ERR = 13;
Fleur.DOMException.NAMESPACE_ERR = 14;
Fleur.DOMException.INVALID_ACCESS_ERR = 15;
Fleur.DOMException.VALIDATION_ERR = 16;
Fleur.DOMException.TYPE_MISMATCH_ERR = 17;

Fleur.DOMError = function() {};
Fleur.DOMError.SEVERITY_WARNING = 1;
Fleur.DOMError.SEVERITY_ERROR = 2;
Fleur.DOMError.SEVERITY_FATAL_ERROR = 3;

Fleur.DOMErrorHandler = function() {};
/*
Fleur.DOMErrorHandler.prototype.handleError = function(error) {
};
*/

Fleur.DOMLocator = function() {};

Fleur.DOMConfiguration = function() {
	this._parameters = {
		"canonical-form": false,
		"cdata-sections": true,
		"check-character-normalization": false,
		"comments": true,
		"datatype-normalization": false,
		"element-content-whitespace": true,
		"entities": true,
		"error-handler": function(){},
		"infoset": true,
		"namespaces": true,
		"namespace-declarations": true,
		"normalize-characters": false,
		"schema-location": null,
		"schema-type" : null,
		"split-cdata-sections": true,
		"validate": false,
		"validate-if-schema": false,
		"well-formed": true
	};
	this.parametersNames = new Fleur.DOMStringList();
	for (var p in this._parameters) {
		if (this._parameters.hasOwnProperty(p)) {
			this.parametersNames.push(p);
		}
	}
};
Fleur.DOMConfiguration.prototype.canSetParameter = function(name, value) {
	return this.parametersNames.contains(name) && (typeof this._parameters[name] === typeof value);
};
Fleur.DOMConfiguration.prototype.setParameter = function(name, value) {
	this._parameters[name] = value;
};
Fleur.DOMConfiguration.prototype.getParameter = function(name) {
	return this._parameters[name];
};

Fleur.DOMStringList = function() {};
Fleur.DOMStringList.prototype = new Array();
Fleur.DOMStringList.prototype.item = function(index) {
	return this[index];
};
Fleur.DOMStringList.prototype.contains = function(str) {
	var i = 0, l = this.length;
	while (i < l) {
		if (this[i] === str) {
			return true;
		}
		i++;
	}
	return false;
};

Fleur.NameList = function() {};
Fleur.NameList.prototype = new Array();
Fleur.NameList.prototype.contains = function(str) {
	var i = 0, l = this.length;
	while (i < l) {
		if (this[i][1] === str) {
			return true;
		}
		i++;
	}
	return false;
};
Fleur.NameList.prototype.containsNS = function(namespaceURI, name) {
	var i = 0, l = this.length;
	while (i < l) {
		if (this[i][0] === namespaceURI && this[i][1] === name) {
			return true;
		}
		i++;
	}
	return false;
};
Fleur.NameList.prototype.getName = function(index) {
	return this[index][1];
};
Fleur.NameList.prototype.getNamespaceURI = function(index) {
	return this[index][0];
};

Fleur.DOMImplementationList = function() {};
Fleur.DOMImplementationList.prototype = new Array();
Fleur.DOMImplementationList.prototype.item = function(index) {
	return this[index];
};

Fleur._DOMImplementations = new Fleur.DOMImplementationList();
Fleur.DOMImplementationSource = function() {};
Fleur.DOMImplementationSource.prototype.getDOMImplementation = function(features) {
	var f, l0 = Fleur._DOMImplementations.length, l1, i = 0, j = 0, version = /^[0-9]*\.[0-9]*$/;
	f = features.split(" ");
	l1 = f.length;
	while (j < l1) {
		if (j < l1 - 1 && !version.test(f[j + 1])) {
			f.splice(j + 1, 0, "");
			f[j + 1] = null;
			l1++;
		}
		j += 2;
	}
	while (i < l0) {
		j = 0;
		while (j < l1 && Fleur._DOMImplementations.item(i).hasFeature(f[j], f[j + 1])) {
			j += 2;
		}
		if (j >= l1) {
			return Fleur._DOMImplementations.item(i);
		}
		i++;
	}
};
Fleur.DOMImplementationSource.prototype.getDOMImplementationList = function(features) {
	var f, l0 = Fleur._DOMImplementations.length, l1, i = 0, j = 0, version = /^[0-9]*\.[0-9]*$/g, list = new Fleur.DOMImplementationList();
	f = features.split(" ");
	l1 = f.length;
	while (j < l1) {
		if (j < l1 - 1 && !version.test(f[j + 1])) {
			f.splice(j + 1, 0, "");
			f[j + 1] = null;
			l1++;
		}
		j += 2;
	}
	while (i < l0) {
		j = 0;
		while (j < l1 && Fleur._DOMImplementations.item(i).hasFeature(f[j], f[j + 1])) {
			j += 2;
		}
		if (j >= l1) {
			list.push(Fleur._DOMImplementations.item(i));
		}
		i++;
	}
	return list;
};

Fleur.DOMImplementation = function() {};
Fleur.DOMImplementation.prototype._Features = [
	["core", "3.0"],
	["core", "2.0"],
	["core", "1.0"],
	["xml", "3.0"],
	["xml", "1.0"],
	["xml", "2.0"]
];
Fleur.DOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
	var doc = new Fleur.Document();
	if (doctype && (doctype.ownerDocument || doctype._implementation !== this)) {
		throw new Fleur.DOMException(Fleur.DOMException.WRONG_DOCUMENT_ERR);
	}
	doc.implementation = this;
	//doc.ownerDocument = doc;
	if (qualifiedName) {
		doc.appendChild(doc.createElementNS(namespaceURI, qualifiedName));
	}
	if (doctype) {
		doctype.ownerDocument = doc;
		doc.doctype = doctype;
	}
	return doc;
};
Fleur.DOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
	var dt = new Fleur.DocumentType();
	if (!Fleur.Node.QNameReg.test(qualifiedName)) {
		if (Fleur.Node.QNameCharsReg.test(qualifiedName)) {
			throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
		} else {
			throw new Fleur.DOMException(Fleur.DOMException.INVALID_CHARACTER_ERR);
		}
	}
	dt.nodeName = dt.name = qualifiedName;
	dt.entities = new Fleur.NamedNodeMap();
	dt.entities.ownernode = dt;
	dt.notations = new Fleur.NamedNodeMap();
	dt.notations.ownerNode = dt;
	dt.publicId = publicId;
	dt.systemId = systemId;
	dt._implementation = this;
	return dt;
};
Fleur.DOMImplementation.prototype.getFeature = function(feature, version) {
	return this.hasFeature(feature, version) ? this : null;
};
Fleur.DOMImplementation.prototype.hasFeature = function(feature, version) {
	var i = 0, l = this._Features.length;
	if (version === "") {
		version = null;
	}
	feature = feature.toLowerCase();
	while (i < l) {
		if (this._Features[i][0] === feature && (!version || this._Features[i][1] === version)) {
			return true;
		}
		i++;
	}
	return false;
};
Fleur._DOMImplementation = new Fleur.DOMImplementation();
Fleur._DOMImplementations.push(Fleur._DOMImplementation);

Fleur.NodeList = function() {};
Fleur.NodeList.prototype = new Array();
Fleur.NodeList.prototype.item = function(index) {
	return this[index];
};

Fleur.NamedNodeMap = function() {};
Fleur.NamedNodeMap.prototype = new Array();
Fleur.NamedNodeMap.prototype.getNamedItem = function(name) {
	var i = 0, l = this.length;
	while (i < l) {
		if (this[i].nodeName === name) {
			return this[i];
		}
		i++;
	}
	return null;
};
Fleur.NamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
	var i = 0, l = this.length;
	while (i < l) {
		if (this[i].namespaceURI == namespaceURI && this[i].localName === localName) {
			return this[i];
		}
		i++;
	}
	return null;
};
Fleur.NamedNodeMap.prototype.item = function(index) {
	return this[index];
};
Fleur.NamedNodeMap.prototype.removeNamedItem = function(name) {
	var i = 0, l = this.length, node;
	while (i < l) {
		if (this[i].localName === name) {
			node = this[i];
			this.splice(i, 1);
			return node;
		}
		i++;
	}
	throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
	return null;
};
Fleur.NamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
	var i = 0, l = this.length, node;
	while (i < l) {
		if (this[i].namespaceURI === namespaceURI && this[i].localName === localName) {
			node = this[i];
			this.splice(i, 1);
			return node;
		}
		i++;
	}
	throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
	return null;
};
Fleur.NamedNodeMap.prototype.setNamedItem = function(arg) {
	var i = 0, l = this.length, node;
	if (arg.ownerElement && arg.ownerElement !== this.ownerNode) {
		throw new Fleur.DOMException(Fleur.DOMException.INUSE_ATTRIBUTE_ERR);
	}
	if (this.ownerNode && this.ownerNode.nodeType === Fleur.Node.ELEMENT_NODE && arg.nodeType !== Fleur.Node.ATTRIBUTE_NODE) {
		throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
	}
	while (i < l) {
		if (this[i].localName === arg.localName) {
			node = this[i];
			this.splice(i, 1);
			this.push(arg);
			return node;
		}
		i++;
	}
	this.push(arg);
	return null;
};
Fleur.NamedNodeMap.prototype.setNamedItemNS = function(arg) {
	var i = 0, l = this.length, node;
	if (arg.ownerElement && arg.ownerElement !== this.ownerNode) {
		throw new Fleur.DOMException(Fleur.DOMException.INUSE_ATTRIBUTE_ERR);
	}
	while (i < l) {
		if (this[i].namespaceURI === arg.namespaceURI && this[i].localName === arg.localName) {
			node = this[i];
			this.splice(i, 1);
			this.push(arg);
			return node;
		}
		i++;
	}
	this.push(arg);
	return null;
};

Fleur.Node = function() {
	this._userData = {};
	this.childNodes = new Fleur.NodeList();
	this.children = new Fleur.NodeList();
};
Fleur.Node.ELEMENT_NODE = 1;
Fleur.Node.ATTRIBUTE_NODE = 2;
Fleur.Node.TEXT_NODE = 3;
Fleur.Node.CDATA_NODE = 4;
Fleur.Node.ENTITY_REFERENCE_NODE = 5;
Fleur.Node.ENTITY_NODE = 6;
Fleur.Node.PROCESSING_INSTRUCTION_NODE = 7;
Fleur.Node.COMMENT_NODE = 8;
Fleur.Node.DOCUMENT_NODE = 9;
Fleur.Node.DOCUMENT_TYPE_NODE = 10;
Fleur.Node.DOCUMENT_FRAGMENT_NODE = 11;
Fleur.Node.NOTATION_NODE = 12;
Fleur.Node.NAMESPACE_NODE = 129;
Fleur.Node.ATOMIC_NODE = Fleur.Node.TEXT_NODE;
Fleur.Node.SEQUENCE_NODE = 130;
Fleur.Node.DOCUMENT_POSITION_DISCONNECTED = 1;
Fleur.Node.DOCUMENT_POSITION_PRECEDING = 2;
Fleur.Node.DOCUMENT_POSITION_FOLLOWING = 4;
Fleur.Node.DOCUMENT_POSITION_CONTAINS = 8;
Fleur.Node.DOCUMENT_POSITION_CONTAINED_BY = 16;
Fleur.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
Fleur.Node.QNameReg = /^([_A-Z][-_.\w]*:)?[_A-Z][-_.\w]*$/i;
Fleur.Node.QNameCharsReg = /^[-_.\w:]+$/i;
Fleur.Node.prefixReg = /^[-_.\w]+$/i;
Object.defineProperties(Fleur.Node.prototype, {
	prefix: {
		set: function(value) {
			if ((value === "xml" && this.namespaceURI !== "http://www.w3.org/XML/1998/namespace") ||
				(value === "xmlns" && this.namespaceURI !== "http://www.w3.org/2000/xmlns/")) {
				throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
			}
			if (!Fleur.Node.prefixReg.test(value)) {
				throw new Fleur.DOMException(Fleur.DOMException.INVALID_CHARACTER_ERR);
			}
			this._prefix = value;
			if (value) {
				this.nodeName = value + ":" + this.localName;
			}
		},
		get: function() {
			return this._prefix;
		}
	}
});
Fleur.Node.prototype.appendChild = function(newChild) {
	//console.log((this.nodeType === Fleur.Node.ATTRIBUTE_NODE ? this.ownerElement.nodeName + "[" + this.ownerElement.childNodes.length + "]/@" + this.nodeName : this.nodeName + "[" + this.childNodes.length + "]") + " -> " + (newChild.nodeName === "#text" ? '"' + newChild.nodeValue.replace("\n","\\n") + '"' : newChild.nodeName + "[" + newChild.childNodes.length + "]"));
	var n = this, i = 0, l;
	if (newChild.nodeType === Fleur.Node.DOCUMENT_FRAGMENT_NODE) {
		l = newChild.childNodes.length;
		while (i < l) {
			this.appendChild(newChild.childNodes[0]);
			i++;
		}
	} else if (newChild.nodeType === Fleur.Node.ATTRIBUTE_NODE || (this.nodeType === Fleur.Node.ATTRIBUTE_NODE && newChild.nodeType !== Fleur.Node.TEXT_NODE)) {
		throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
	} else {
		while (n) {
			if (n === newChild) {
				throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
			}
			n = n.parentNode || n.ownerElement;
		}
		if (newChild.ownerDocument && (this.ownerDocument || this) !== newChild.ownerDocument) {
			throw new Fleur.DOMException(Fleur.DOMException.WRONG_DOCUMENT_ERR);
		}
		if (newChild.parentNode) {
			newChild.parentNode.removeChild(newChild);
		}
		if (this.childNodes.length === 0) {
			this.firstChild = newChild;
		}
		newChild.previousSibling = this.lastChild;
		newChild.nextSibling = null;
		if (this.lastChild) {
			this.lastChild.nextSibling = newChild;
		}
		newChild.parentNode = this;
		this.lastChild = newChild;
		this.childNodes.push(newChild);
		if (newChild.nodeType === Fleur.Node.ELEMENT_NODE) {
			this.children.push(newChild);
		}
	}
	return newChild;
};
Fleur.Node.prototype.cloneNode = function(deep) {
	var i = 0, li = 0, j = 0, lj = 0, clone = null;
	switch (this.nodeType) {
		case Fleur.Node.TEXT_NODE:
			clone = this.ownerDocument.createTextNode(this.data);
			break;
		case Fleur.Node.CDATA_NODE:
			clone = this.ownerDocument.createCDATASection(this.data);
			break;
		case Fleur.Node.ATTRIBUTE_NODE:
			clone = this.ownerDocument.createAttributeNS(this.namespaceURI, this.nodeName);
			lj = this.childNodes.length;
			while (j < lj) {
				clone.appendChild(this.childNodes[j++].cloneNode(true));
			}
			break;
		case Fleur.Node.ELEMENT_NODE:
			clone = this.ownerDocument.createElementNS(this.namespaceURI, this.nodeName);
			li = this.attributes.length;
			while (i < li) {
				clone.setAttributeNode(this.attributes[i++].cloneNode(false));
			}
			if (deep) {
				lj = this.childNodes.length;
				while (j < lj) {
					clone.appendChild(this.childNodes[j++].cloneNode(true));
				}
			}
			break;
		case Fleur.Node.DOCUMENT_NODE:
			break;
	}
	return clone;
};
Fleur.Node.prototype.compareDocumentPosition = function(other) {
	var nancestor = this.ownerElement || this.parentNode;
	var nancestors = [];
	var oancestor = other.ownerElement || other.parentNode;
	var oancestors = [];
	var i = 0, j = 0;
	if (this.ownerDocument.implementation !== other.ownerDocument.implementation) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_SUPPORTED_ERR);
	}
	if (this === other) {
		return 0;
	}
	while (nancestor) {
		nancestors.splice(0, 0, nancestor);
		nancestor = nancestor.parentNode;
	}
	while (oancestor) {
		oancestors.splice(0, 0, oancestor);
		oancestor = oancestor.parentNode;
	}
	do {
		if (nancestors[i] !== oancestors[i]) {
			if (i === 0) {
				return Fleur.Node.DOCUMENT_POSITION_DISCONNECTED;
			}
			if (!nancestors[i]) {
				return Fleur.Node.DOCUMENT_POSITION_CONTAINS | Fleur.Node.DOCUMENT_POSITION_PRECEDING;
			}
			if (!oancestors[i]) {
				return Fleur.Node.DOCUMENT_POSITION_CONTAINED_BY | Fleur.Node.DOCUMENT_POSITION_FOLLOWING;
			}
			do {
				if (nancestors[i - 1].childNodes[j] === nancestors[i]) {
					return Fleur.Node.DOCUMENT_POSITION_PRECEDING;
				}
				if (nancestors[i - 1].childNodes[j] === oancestors[i]) {
					return Fleur.Node.DOCUMENT_POSITION_FOLLOWING;
				}
			} while (j++);
		}
		if (!nancestors[i]) {
			return (this.localName < other.localName ? Fleur.Node.DOCUMENT_POSITION_PRECEDING : Fleur.Node.DOCUMENT_POSITION_FOLLOWING) | Fleur.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
	} while (i++);
};
Fleur.Node.prototype.getFeature = function(feature, version) {
	return this.ownerDocument.implementation.getFeature(feature, version);
};
Fleur.Node.prototype.getUserData = function(key) {
	return this._userData[key];
};
Fleur.Node.prototype.hasAttributes = function() {
	return !!this.attributes && this.attributes.length !== 0;
};
Fleur.Node.prototype.hasChildNodes = function() {
	return !!this.childNodes && this.childNodes.length !== 0;
};
Fleur.Node.prototype.insertBefore = function(newChild, refChild) {
	var i = 0, l = this.childNodes.length, n = refChild, ln;
	if (newChild.nodeType === Fleur.Node.DOCUMENT_FRAGMENT_NODE) {
		ln = newChild.childNodes.length;
		while (i < ln) {
			this.insertBefore(newChild.childNodes[0], refChild);
			i++;
		}
		return newChild;
	} else if (newChild.nodeType === Fleur.Node.ATTRIBUTE_NODE || (this.nodeType === Fleur.Node.ATTRIBUTE_NODE && newChild.nodeType !== Fleur.Node.TEXT_NODE)) {
		throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
	} else {
		if (refChild) {
			while (n) {
				if (n === newChild) {
					throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
				}
				n = n.parentNode || n.ownerElement;
			}
			if (refChild.ownerDocument !== newChild.ownerDocument) {
				throw new Fleur.DOMException(Fleur.DOMException.WRONG_DOCUMENT_ERR);
			}
			if (refChild.parentNode !== this) {
				throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
			}
			if (newChild.parentNode) {
				newChild.parentNode.removeChild(newChild);
			}
			while (i < l) {
				if (this.childNodes[i] === refChild) {
					newChild.parentNode = this;
					newChild.previousSibling = refChild.previousSibling;
					refChild.previousSibling = newChild;
					if (newChild.previousSibling) {
						newChild.previousSibling.nextSibling = newChild;
					} else {
						this.firstChild = newChild;
					}
					newChild.nextSibling = refChild;
					this.childNodes.splice(i, 0, newChild);
					return newChild;
				}
				i++;
			}
		} else {
			if (newChild.parentNode) {
				newChild.parentNode.removeChild(newChild);
			}
			newChild.parentNode = this;
			if (this.childNodes.length !== 0) {
				newChild.previousSibling = this.childNodes[this.childNodes.length - 1];
				this.childNodes[this.childNodes.length - 1].nextSibling = newChild;
			} else {
				newChild.previousSibling = null;
			}
			newChild.nextSibling = null;
			this.childNodes.push(newChild);
			this.lastChild = newChild;
			return newChild;
		}
	}
};
Fleur.Node.prototype.isDefaultNamespace = function(namespaceURI) {
	var pnode = this.parentNode || this.ownerElement || this.documentElement;
	if (this.nodeType === Fleur.Node.ELEMENT_NODE) {
		return this.prefix ? this.getAttribute("xmlns") === namespaceURI : this.namespaceURI === namespaceURI;
	}
	return pnode ? pnode.isDefaultNamespace(namespaceURI) : false;
};
Fleur.Node.prototype.isEqualNode = function(arg) {
	return arg === this;
};
/*
Fleur.Node.prototype.isSameNode = function(other) {
};
*/
Fleur.Node.prototype.isSupported = function(feature, version) {
 var doc = this.ownerDocument ? this.ownerDocument : this;
 return doc.implementation.hasFeature(feature, version);
};
Fleur.Node.prototype.lookupNamespaceURI = function(prefix) {
	var pnode = this;
	if (prefix === null || prefix === '') {
		return null;
	}
	if (pnode.nodeType === Fleur.Node.DOCUMENT_NODE) {
		pnode = pnode.documentElement;
	}
	while (pnode) {
		if (pnode.nodeType === Fleur.Node.ELEMENT_NODE) {
			//return this.prefix ? this.getAttribute("xmlns") === namespaceURI : this.namespaceURI === namespaceURI;
		}
		pnode = pnode.parentNode || pnode.ownerElement;
	}
	return null;
};
Fleur.Node.prototype.lookupPrefix = function(namespaceURI) {
	var pnode = this;
	if (namespaceURI === null || namespaceURI === '') {
		return null;
	}
	if (pnode.nodeType === Fleur.Node.DOCUMENT_NODE) {
		pnode = pnode.documentElement;
	}
	while (pnode) {
		if (pnode.nodeType === Fleur.Node.ELEMENT_NODE) {
			//return this.prefix ? this.getAttribute("xmlns") === namespaceURI : this.namespaceURI === namespaceURI;
		}
		pnode = pnode.parentNode || pnode.ownerElement;
	}
	return null;
};
Fleur.Node.prototype.normalize = function() {
	var i = 0, j;
	while (i < this.childNodes.length) {
		switch (this.childNodes[i].nodeType) {
			case Fleur.Node.ATTRIBUTE_NODE:
			case Fleur.Node.ELEMENT_NODE:
				this.childNodes[i].normalize();
				break;
			case Fleur.Node.TEXT_NODE:
				while (i + 1 < this.childNodes.length) {
					if (this.childNodes[i + 1].nodeType !== Fleur.Node.TEXT_NODE) {
						break;
					}
					this.childNodes[i].appendData(this.childNodes[i + 1].nodeValue);
					this.removeChild(this.childNodes[i + 1]);
				}
				if (this.childNodes[i].data.length === 0) {
					this.removeChild(this.childNodes[i]);
				}
				break;
		}
		i++;
	}
};
Fleur.Node.prototype.removeChild = function(oldChild) {
	var i = 0, l = this.childNodes.length;
	if (oldChild.parentNode !== this) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
	}
	while (i < l) {
		if (this.childNodes[i] === oldChild) {
			if (oldChild.previousSibling) {
				oldChild.previousSibling.nextSibling = oldChild.nextSibling;
			} else {
				this.firstChild = oldChild.nextSibling;
			}
			if (oldChild.nextSibling) {
				oldChild.nextSibling.previousSibling = oldChild.previousSibling;
			} else {
				this.lastChild = oldChild.previousSibling;
			}
			this.childNodes.splice(i, 1);
			oldChild.parentNode = null;
			oldChild.previousSibling = null;
			oldChild.nextSibling = null;
			return oldChild;
		}
		i++;
	}
};
Fleur.Node.prototype.replaceChild = function(newChild, oldChild) {
	var i = 0, l = this.childNodes.length, n = this;
	if (this.nodeType === Fleur.Node.DOCUMENT_NODE && (oldChild.nodeType === Fleur.Node.ELEMENT_NODE || oldChild.nodeType === Fleur.Node.DOCUMENT_TYPE_NODE)) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_SUPPORTED_ERR);
	}
	if (newChild.nodeType === Fleur.Node.ATTRIBUTE_NODE) {
		throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
	}
	while (n) {
		if (n === newChild) {
			throw new Fleur.DOMException(Fleur.DOMException.HIERARCHY_REQUEST_ERR);
		}
		n = n.parentNode || n.ownerElement;
	}
	if (oldChild.parentNode !== this) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
	}
	if (newChild.ownerDocument !== (this.ownerDocument || this)) {
		throw new Fleur.DOMException(Fleur.DOMException.WRONG_DOCUMENT_ERR);
	}
	if (oldChild === newChild) {
		return oldChild;
	}
	while (i < l) {
		if (this.childNodes[i] === oldChild) {
			this.childNodes[i] = newChild;
			newChild.parentNode = this;
			newChild.previousSibling = oldChild.previousSibling;
			if (newChild.previousSibling) {
				newChild.previousSibling.nextSibling = newChild;
			} else {
				this.firstChild = newChild;
			}
			newChild.nextSibling = oldChild.nextSibling;
			if (newChild.nextSibling) {
				newChild.nextSibling.previousSibling = newChild;
			} else {
				this.lastChild = newChild;
			}
			oldChild.parentNode = null;
			oldChild.previousSibling = null;
			oldChild.nextSibling = null;
			return oldChild;
		}
		i++;
	}
	return oldChild;
};
Fleur.Node.prototype.setUserData = function(key, data, handler) {
	this._userData[key] = data;
};
Fleur.Node.prototype._setOwnerDocument = function(document) {
	if (this.ownerDocument) {
		throw new Fleur.DOMException(Fleur.DOMException.WRONG_DOCUMENT_ERR);
	}
	this.ownerDocument = document;
};
Fleur.Node.prototype._setNodeNameLocalNamePrefix = function(namespaceURI, qualifiedName) {
	var pos = qualifiedName.indexOf(":");
	if ( pos === 0 || pos === qualifiedName.length - 1 || (!namespaceURI && pos > 0) || (namespaceURI === "http://www.w3.org/XML/1998/namespace" && qualifiedName.substr(0, pos) !== "xml")) {
		throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
	}
	this.nodeName = qualifiedName;
	this.namespaceURI = namespaceURI;
	this.localName = qualifiedName.substr(pos + 1);
	this.prefix = pos > 0 ? qualifiedName.substr(0, pos) : null;
};

Fleur.Element = function() {
	Fleur.Node.apply(this);
	this.attributes = new Fleur.NamedNodeMap();
	this.attributes.ownerNode = this;
	this.namespaces = new Fleur.NamedNodeMap();
	this.nodeType = Fleur.Node.ELEMENT_NODE;
};
Fleur.Element.prototype = new Fleur.Node();
Object.defineProperties(Fleur.Element.prototype, {
	nodeValue: {
		set: function(value) {},
		get: function() {
			return null;
		}
	},
	tagName: {
		set: function(value) {
			this.nodeName = value;
		},
		get: function() {
			return this.nodeName;
		}
	}
});
Fleur.Element.prototype.getAttribute = function(name) {
	return this.getAttributeNS(null, name);
};
Fleur.Element.prototype.getAttributeNode = function(name) {
	var i = 0, l = this.attributes.length;
	while (i < l) {
		if (this.attributes[i].nodeName === name) {
			return this.attributes[i];
		}
		i++;
	}
	return null;
};
Fleur.Element.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
	var i = 0, l = this.attributes.length;
	while (i < l) {
		if (this.attributes[i].localName === localName && (!namespaceURI || this.attributes[i].namespaceURI === namespaceURI)) {
			return this.attributes[i];
		}
		i++;
	}
	return null;
};
Fleur.Element.prototype.getAttributeNS = function(namespaceURI, localName) {
	var i = 0, l = this.attributes.length;
	while (i < l) {
		if (this.attributes[i].localName === localName && (!namespaceURI || this.attributes[i].namespaceURI === namespaceURI)) {
			return this.attributes[i].nodeValue;
		}
		i++;
	}
	return "";
};
Fleur.Element.prototype._getElementsByTagNameNS = function(namespaceURI, localName, elts) {
	var i = 0, l = this.children.length;
	if ((namespaceURI === "*" || this.namespaceURI === namespaceURI) && (localName === "*" || this.localName === localName)) {
		elts.push(this);
	}
	while (i < l) {
		this.children[i++]._getElementsByTagNameNS(namespaceURI, localName, elts);
	}
};
Fleur.Element.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
	var elts = new Fleur.NodeList();
	var i = 0, l = this.children.length;
	if (!namespaceURI) {
		return this.getElementsByTagName(localName);
	}
	while (i < l) {
		this.children[i++]._getElementsByTagNameNS(namespaceURI, localName, elts);
	}
	return elts;
};
Fleur.Element.prototype._getElementsByTagName = function(name, elts) {
	var i = 0, l = this.children.length;
	if (name === "*" || this.tagName === name) {
		elts.push(this);
	}
	while (i < l) {
		this.children[i++]._getElementsByTagName(name, elts);
	}
};
Fleur.Element.prototype.getElementsByTagName = function(name) {
	var elts = new Fleur.NodeList();
	var i = 0, l = this.children.length;
	while (i < l) {
		this.children[i++]._getElementsByTagName(name, elts);
	}
	return elts;
};
Fleur.Element.prototype.hasAttribute = function(name) {
	return !!this.attributes.getNamedItem(name);
};
Fleur.Element.prototype.hasAttributeNS = function(namespaceURI, localName) {
	return this.attributes.getNamedItemNS(namespaceURI, localName) !== null;
};
Fleur.Element.prototype.removeAttribute = function(name) {
	this.attributes.removeNamedItem(name);
};
Fleur.Element.prototype.removeAttributeNode = function(oldAttr) {
	if (oldAttr.ownerElement !== this) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
	}
	this.attributes.removeNamedItemNS(oldAttr.namespaceURI, oldAttr.localName);
	return oldAttr;
};
Fleur.Element.prototype.removeAttributeNS = function(namespaceURI, localName) {
	this.attributes.removeNamedItemNS(namespaceURI, localName);
};
Fleur.Element.prototype.setAttribute = function(name, value) {
	var attr;
	if (this.hasAttribute(name)) {
		attr = this.attributes.getNamedItem(name);
		attr.nodeValue = value;
		return;
	}
	attr = this.ownerDocument.createAttribute(name);
	attr.ownerElement = this;
	attr.appendChild(this.ownerDocument.createTextNode(value));
	this.attributes.setNamedItem(attr);
};
Fleur.Element.prototype.setAttributeNode = function(newAttr) {
	var n = this.attributes.setNamedItem(newAttr);
	newAttr.ownerElement = this;
	return n;
};
Fleur.Element.prototype.setAttributeNodeNS = function(newAttr) {
	var n = this.attributes.setNamedItemNS(newAttr);
	newAttr.ownerElement = this;
	return n;
};
Fleur.Element.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
	var attr;
	if (this.hasAttributeNS(namespaceURI, qualifiedName)) {
		attr = this.attributes.getNamedItemNS(namespaceURI, qualifiedName);
		attr.nodeValue = value;
		return;
	}
	attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
	attr.ownerElement = this;
	attr.nodeValue = value;
	this.attributes.setNamedItemNS(attr);
};
/*
Fleur.Element.prototype.setIdAttribute = function(name, isId) {
};
*/
/*
Fleur.Element.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
};
*/
/*
Fleur.Element.prototype.setIdAttributeNode = function(idAttr, isId) {
};
*/

Fleur.Attr = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.ATTRIBUTE_NODE;
};
Fleur.Attr.prototype = new Fleur.Node();
Object.defineProperties(Fleur.Attr.prototype, {
	nodeValue: {
		set: function(value) {
			if (value) {
				if (!this.firstChild) {
					this.appendChild(this.ownerDocument.createTextNode(value));
					return;
				}
				this.firstChild.nodeValue = value;
				return;
			}
			if (this.firstChild) {
				this.removeChild(this.firstChild);
			}
		},
		get: function() {
			var s = "", i = 0, l = this.childNodes ? this.childNodes.length : 0;
			while (i < l) {
				s += this.childNodes[i].nodeValue;
				i++;
			}
			return s;
		}
	},
	specified: {
		get: function() {
			return true;
			//return !!this.firstChild;
		}
	},
	value: {
		set: function(value) {
			if (value) {
				if (!this.firstChild) {
					this.appendChild(this.ownerDocument.createTextNode(value));
					return;
				}
				this.firstChild.nodeValue = value;
				return;
			}
			if (this.firstChild) {
				this.removeChild(this.firstChild);
			}
		},
		get: function() {
			var s = "", i = 0, l = this.childNodes ? this.childNodes.length : 0;
			while (i < l) {
				s += this.childNodes[i].nodeValue;
				i++;
			}
			return s;
		}
	}
});

Fleur.CharacterData = function() {
	this.data = "";
	this.length = 0;
};
Fleur.CharacterData.prototype = new Fleur.Node();
Fleur.CharacterData.prototype.appendData = function(arg) {
	this.textContent = this.nodeValue = this.data += arg;
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.deleteData = function(offset, count) {
	if (count < 0 || offset < 0 || this.data.length < offset) {
		throw new Fleur.DOMException(Fleur.DOMException.INDEX_SIZE_ERR);
	}
	this.textContent = this.nodeValue = this.data = this.data.substr(0, offset) + this.data.substr(offset + count);
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.insertData = function(offset, data) {
	if (offset < 0 || this.data.length < offset) {
		throw new Fleur.DOMException(Fleur.DOMException.INDEX_SIZE_ERR);
	}
	this.textContent = this.nodeValue = this.data = this.data.substr(0, offset) + data + this.data.substr(offset);
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.replaceData = function(offset, count, arg) {
	if (count < 0 || offset < 0 || this.data.length < offset) {
		throw new Fleur.DOMException(Fleur.DOMException.INDEX_SIZE_ERR);
	}
	this.textContent = this.nodeValue = this.data = this.data.substr(0, offset) + arg + this.data.substr(offset + count);
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.substringData = function(offset, count) {
	if (count < 0 || offset < 0 || this.data.length < offset) {
		throw new Fleur.DOMException(Fleur.DOMException.INDEX_SIZE_ERR);
	}
	return this.data.substr(offset, count);
};

Fleur.Text = function() {
	this.nodeType = Fleur.Node.TEXT_NODE;
	this.nodeName = "#text";
};
Fleur.Text.prototype = new Fleur.CharacterData();
Object.defineProperties(Fleur.Text.prototype, {
	nodeValue: {
		set: function(value) {
			this.data = value;
			this.length = value.length;
		},
		get: function() {
			return this.data;
		}
	}
});
/*
Fleur.Text.prototype.replaceWholeText = function(content) {
};
*/
Fleur.Text.prototype.splitText = function(offset) {
	var t;
	if (offset < 0 || this.data.length < offset) {
		throw new Fleur.DOMException(Fleur.DOMException.INDEX_SIZE_ERR);
	} 
	t = this.cloneNode(true);
	t.deleteData(0, offset);
	this.deleteData(offset, this.length - offset);
	if (this.parentNode) {
		this.parentNode.insertBefore(t, this.nextSibling);
	}
	return t;
};

Fleur.CDATASection = function() {
	this.nodeType = Fleur.Node.CDATA_NODE;
	this.nodeName = "#cdata-section";
};
Fleur.CDATASection.prototype = new Fleur.CharacterData();

Fleur.EntityReference = function() {
	this.nodeType = Fleur.Node.ENTITY_REFERENCE_NODE;
};
Fleur.EntityReference.prototype = new Fleur.Node();

Fleur.Entity = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.ENTITY_NODE;
};
Fleur.Entity.prototype = new Fleur.Node();

Fleur.ProcessingInstruction = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.PROCESSING_INSTRUCTION_NODE;
};
Fleur.ProcessingInstruction.prototype = new Fleur.Node();
Object.defineProperties(Fleur.ProcessingInstruction.prototype, {
	nodeValue: {
		set: function(value) {
			this.data = value;
		},
		get: function() {
			return this.data;
		}
	}
});

Fleur.Comment = function() {
	this.nodeType = Fleur.Node.COMMENT_NODE;
	this.nodeName = "#comment";
};
Fleur.Comment.prototype = new Fleur.CharacterData();

Fleur.Namespace = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.NAMESPACE_NODE;
};
Fleur.Namespace.prototype = new Fleur.Node();
Object.defineProperties(Fleur.Namespace.prototype, {
	nodeValue: {
		set: function(value) {
			if (value) {
				if (!this.firstChild) {
					this.appendChild(this.ownerDocument.createTextNode(value));
					return;
				}
				this.firstChild.nodeValue = value;
				return;
			}
			if (this.firstChild) {
				this.removeChild(this.firstChild);
			}
		},
		get: function() {
			var s = "", i = 0, l = this.childNodes ? this.childNodes.length : 0;
			while (i < l) {
				s += this.childNodes[i].nodeValue;
				i++;
			}
			return s;
		}
	},
	specified: {
		get: function() {
			return !!this.firstChild;
		}
	},
	value: {
		set: function(value) {
			if (value) {
				if (!this.firstChild) {
					this.appendChild(this.ownerDocument.createTextNode(value));
					return;
				}
				this.firstChild.nodeValue = value;
				return;
			}
			if (this.firstChild) {
				this.removeChild(this.firstChild);
			}
		},
		get: function() {
			var s = "", i = 0, l = this.childNodes ? this.childNodes.length : 0;
			while (i < l) {
				s += this.childNodes[i].nodeValue;
				i++;
			}
			return s;
		}
	}
});

Fleur.Document = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.DOCUMENT_NODE;
	this.nodeName = "#document";
	this.inputEncoding = "UTF-8";
	this.xmlStandalone = false;
	this.xmlVersion = "1.0";
	this._elementById = {};
	this._elementsByTagName = {
		" ": {}
	};
};
Fleur.Document.prototype = new Fleur.Node();
Object.defineProperties(Fleur.Document.prototype, {
	documentElement: {
		get: function() {
			return this.children[0] ? this.children[0] : null;
		}
	},
	nodeValue: {
		set: function(value) {},
		get: function() {
			return null;
		}
	}
});
Fleur.Document.prototype._adoptNode = function(source) {
	var ic = 0, lc = source.childNodes ? source.childNodes.length : 0, ia = 0, la = source.attributes ? source.attributes.length : 0;
	source.ownerDocument = this;
	while (ia < la) {
		this.adoptNode(source.attributes.item(ia));
		ia++;
	}
	while (ic < lc) {
		this.adoptNode(source.childNodes[ic]);
		ic++;
	}
	return source;
};
Fleur.Document.prototype.adoptNode = function(source) {
	if (source.nodeType === Fleur.Node.DOCUMENT_NODE || source.nodeType === Fleur.Node.DOCUMENT_TYPE_NODE) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_SUPPORTED_ERR);
	}
	if (source.nodeType === Fleur.Node.ATTRIBUTE_NODE) {
		source.ownerElement = null;
	}
	return this._adoptNode(source);
}
Fleur.Document.prototype.createAttribute = function(name) {
	return this.createAttributeNS(null, name);
};
Fleur.Document.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
	var node = new Fleur.Attr();
	if (!Fleur.Node.QNameReg.test(qualifiedName)) {
		if (Fleur.Node.QNameCharsReg.test(qualifiedName)) {
			throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
		} else {
			throw new Fleur.DOMException(Fleur.DOMException.INVALID_CHARACTER_ERR);
		}
	}
	if ((namespaceURI === null && qualifiedName.indexOf(":") !== -1) ||
		(qualifiedName.substr(0, 4) === "xml:" && namespaceURI !== "http://www.w3.org/XML/1998/namespace") ||
		((qualifiedName === "xmlns" || qualifiedName.substr(0, 6) === "xmlns:") && namespaceURI !==  "http://www.w3.org/2000/xmlns/") ||
		(namespaceURI ===  "http://www.w3.org/2000/xmlns/" && qualifiedName !== "xmlns" && qualifiedName.indexOf(":") !== -1 && qualifiedName.substr(0, 6) !== "xmlns:")) {
		throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
	}
	node._setOwnerDocument(this);
	node._setNodeNameLocalNamePrefix(namespaceURI, qualifiedName);
	node.name = qualifiedName;
	node.textContent = "";
	return node;
};
Fleur.Document.prototype.createCDATASection = function(data) {
	var node = new Fleur.CDATASection();
	node._setOwnerDocument(this);
	node.appendData(data);
	return node;
};
Fleur.Document.prototype.createComment = function(data) {
	var node = new Fleur.Comment();
	node._setOwnerDocument(this);
	node.appendData(data);
	return node;
};
Fleur.Document.prototype.createDocumentFragment = function() {
	var node = new Fleur.DocumentFragment();
	node._setOwnerDocument(this);
	return node;
};
Fleur.Document.prototype.createElement = function(tagName) {
	var node = new Fleur.Element();
	if (!Fleur.Node.QNameReg.test(tagName)) {
		if (Fleur.Node.QNameCharsReg.test(tagName)) {
			throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
		} else {
			throw new Fleur.DOMException(Fleur.DOMException.INVALID_CHARACTER_ERR);
		}
	}
	node._setOwnerDocument(this);
	node.nodeName = tagName;
	this.namespaceURI = null;
	this.localName = tagName;
	this.prefix = null;
	node.childNodes = new Fleur.NodeList();
	node.children = new Fleur.NodeList();
	node.textContent = "";
	return node;
};
Fleur.Document.prototype.createElementNS = function(namespaceURI, qualifiedName) {
	var node = new Fleur.Element();
	if (!Fleur.Node.QNameReg.test(qualifiedName)) {
		if (Fleur.Node.QNameCharsReg.test(qualifiedName)) {
			throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
		} else {
			throw new Fleur.DOMException(Fleur.DOMException.INVALID_CHARACTER_ERR);
		}
	}
	if ((namespaceURI === null && qualifiedName.indexOf(":") !== -1) ||
		(qualifiedName.substr(0, 4) === "xml:" && namespaceURI !== "http://www.w3.org/XML/1998/namespace") ||
		((qualifiedName === "xmlns" || qualifiedName.substr(0, 6) === "xmlns:") && namespaceURI !==  "http://www.w3.org/2000/xmlns/") ||
		(namespaceURI ===  "http://www.w3.org/2000/xmlns/" && qualifiedName !== "xmlns" && qualifiedName.indexOf(":") !== -1 && qualifiedName.substr(0, 6) !== "xmlns:")) {
		throw new Fleur.DOMException(Fleur.DOMException.NAMESPACE_ERR);
	}
	node._setOwnerDocument(this);
	node._setNodeNameLocalNamePrefix(namespaceURI, qualifiedName);
	node.childNodes = new Fleur.NodeList();
	node.children = new Fleur.NodeList();
	node.textContent = "";
	return node;
};
Fleur.Document.prototype.createEntityReference = function(name) {
	var node = new Fleur.EntityReference();
	node._setOwnerDocument(this);
	node._setNodeNameLocalNamePrefix(null, name);
	node.nodeName = name;
	node.textContent = "";
	return node;
};
Fleur.Document.prototype.createProcessingInstruction = function(target, data) {
	var node = new Fleur.ProcessingInstruction();
	if (!Fleur.Node.QNameReg.test(target)) {
		throw new Fleur.DOMException(Fleur.DOMException.INVALID_CHARACTER_ERR);
	}
	node._setOwnerDocument(this);
	node.nodeName = node.target = target;
	node.textContent = node.data = data;
	return node;
};
Fleur.Document.prototype.createTextNode = function(data) {
	var node = new Fleur.Text();
	node._setOwnerDocument(this);
	node.appendData(data);
	return node;
};
Fleur.Document.prototype.createNamespace = function(prefix, namespaceURI) {
	var node = new Fleur.Namespace();
	node.name = prefix;
	node.textContent = node.data = namespaceURI;
	return node;
};
Fleur.Document.prototype.getElementById = function(elementId) {
	return this._elementById[elementId];
};
Fleur.Document.prototype.getElementsByTagName = function(tagName) {
	var i = 0, l = this.children.length, elts = new Fleur.NodeList();
	while (i < l) {
		this.children[i++]._getElementsByTagName(tagName, elts);
	}
	return elts;
};
Fleur.Document.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
	var i = 0, l = this.children.length, elts = new Fleur.NodeList();
	if (!namespaceURI) {
		return this.getElementsByTagName(localName);
	}
	while (i < l) {
		this.children[i++]._getElementsByTagNameNS(namespaceURI, localName, elts);
	}
	return elts;
//	return this._elementsByTagName[namespaceURI] ? this._elementsByTagName[namespaceURI][localName] : null;
};
Fleur.Document.prototype.importNode = function(importedNode, deep) {
	var i = 0, li = 0, j = 0, lj = 0, node = null;
	switch (importedNode.nodeType) {
		case Fleur.Node.TEXT_NODE:
			node = this.createTextNode(importedNode.data);
			break;
		case Fleur.Node.COMMENT_NODE:
			node = this.createComment(importedNode.data);
			break;
		case Fleur.Node.CDATA_NODE:
			node = this.createCDATASection(importedNode.data);
			break;
		case Fleur.Node.PROCESSING_INSTRUCTION_NODE:
			node = this.createProcessingInstruction(importedNode.target, importedNode.data);
			break;
		case Fleur.Node.ATTRIBUTE_NODE:
			node = this.createAttributeNS(importedNode.namespaceURI, importedNode.nodeName);
			lj = importedNode.childNodes.length;
			while (j < lj) {
				node.appendChild(this.importNode(importedNode.childNodes[j++], true));
			}
			break;
		case Fleur.Node.ELEMENT_NODE:
			node = this.createElementNS(importedNode.namespaceURI, importedNode.nodeName);
			li = importedNode.attributes.length;
			while (i < li) {
				node.setAttributeNode(this.importNode(importedNode.attributes[i++], true));
			}
			if (deep) {
				lj = importedNode.childNodes.length;
				while (j < lj) {
					node.appendChild(this.importNode(importedNode.childNodes[j++], true));
				}
			}
			break;
		case Fleur.Node.DOCUMENT_FRAGMENT_NODE:
			node = this.createDocumentFragment();
			if (deep) {
				lj = importedNode.childNodes.length;
				while (j < lj) {
					node.appendChild(this.importNode(importedNode.childNodes[j++], true));
				}
			}
			break;
		case Fleur.Node.DOCUMENT_NODE:
		case Fleur.Node.DOCUMENT_TYPE_NODE:
			throw new Fleur.DOMException(Fleur.DOMException.NOT_SUPPORTED_ERR);
			break;
	}
	return node;
};
/*
Fleur.Document.prototype.normalizeDocument = function() {
};
*/
/*
Fleur.Document.prototype.renameNode = function(n, namespaceURI, qualifiedName) {
};
*/
Fleur.Node.prototype._parseXMLFromString = function(s) {
	var index, offset = 0, end = s.length, name, attrname, attrvalue, attrs, parents = [], doc = this.ownerDocument || this, currnode = this, eltnode, attrnode, c,
		seps_pi = " \t\n\r?", seps_dtd = " \t\n\r[>", seps_close = " \t\n\r>", seps_elt = " \t\n\r/>", seps_attr = " \t\n\r=", seps_value = " \t\n\r'\"", seps = " \t\n\r",
		n, namespaces = {}, newnamespaces = {}, pindex, prefix, localName, dtdtype, dtdpublicid, dtdsystemid, entityvalue, notationvalue;
	while (offset !== end) {
		index = s.indexOf("<", offset);
		if (index !== offset) {
			if (index === -1) {
				index = end;
			}
			s = s.substr(0, offset) + Fleur.DocumentType.resolveEntities(doc.doctype, s.substring(offset, index)) + s.substr(index);
			index = s.indexOf("<", offset);
			end = s.length;
			if (index !== offset) {
				if (index === -1) {
					index = end;
				}
				currnode.appendChild(doc.createTextNode(s.substring(offset, index)));
				if (index === end) {
					break;
				}
			}
			offset = index;
		}
		offset++;
		if (s.charAt(offset) === "!") {
			offset++;
			if (s.substr(offset, 2) === "--") {
				offset += 2;
				index = s.indexOf("-->", offset);
				if (index !== offset) {
					if (index === -1) {
						index = end;
					}
					currnode.appendChild(doc.createComment(s.substring(offset, index)));
					if (index === end) {
						break;
					}
					offset = index;
				}
				offset += 3;
			} else if (s.substr(offset, 7) === "[CDATA[") {
				offset += 7;
				index = s.indexOf("]]>", offset);
				if (index !== offset) {
					if (index === -1) {
						index = end;
					}
					currnode.appendChild(doc.createCDATASection(s.substring(offset, index)));
					if (index === end) {
						break;
					}
					offset = index;
				}
				offset += 3;
			} else if (s.substr(offset, 7) === "DOCTYPE") {
				offset += 7;
				index = s.indexOf(">", offset);
				while (seps.indexOf(c) !== -1) {
					c = s.charAt(offset++);
				}
				name = "";
				while (seps_dtd.indexOf(c) === -1) {
					name += c;
					c = s.charAt(offset++);
				}
				while (seps.indexOf(c) !== -1) {
					c = s.charAt(offset++);
				}
				dtdtype = "";
				while (seps_dtd.indexOf(c) === -1) {
					dtdtype += c;
					c = s.charAt(offset++);
				}
				if (dtdtype === "PUBLIC" || dtdtype === "SYSTEM") {
					if (dtdtype === "PUBLIC") {
						while (seps.indexOf(c) !== -1) {
							c = s.charAt(offset++);
						}
						dtdpublicid = s.substring(offset, Math.min(index - 1, s.indexOf(c, offset)));
						offset += dtdpublicid.length + 1;
						c = s.charAt(offset++);
					}
					while (seps.indexOf(c) !== -1) {
						c = s.charAt(offset++);
					}
					dtdsystemid = s.substring(offset, Math.min(index - 1, s.indexOf(c, offset)));
					offset += dtdsystemid.length + 1;
					c = s.charAt(offset++);
					while (seps.indexOf(c) !== -1) {
						c = s.charAt(offset++);
					}
				} else {
					dtdpublicid = dtdsystemid = null;
				}
				currnode.appendChild(doc.doctype = doc.implementation.createDocumentType(name, dtdpublicid, dtdsystemid));
				doc.doctype.ownerDocument = doc;
				if (c === "[") {
					index = s.indexOf("]", offset);
					c = s.charAt(offset++);
					while (c !== "]" && offset < end) {
						while (seps.indexOf(c) !== -1) {
							c = s.charAt(offset++);
						}
						if (c === "]") {
							break;
						}
						if (s.substr(offset, 7) === "!ENTITY") {
							offset += 7;
							c = s.charAt(offset++);
							while (seps.indexOf(c) !== -1) {
								c = s.charAt(offset++);
							}
							if (c === "%") {
								c = s.charAt(offset++);
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
							}
							name = "";
							while (seps_dtd.indexOf(c) === -1) {
								name += c;
								c = s.charAt(offset++);
							}
							while (seps.indexOf(c) !== -1) {
								c = s.charAt(offset++);
							}
							if (s.substr(offset - 1, 6) === "SYSTEM") {
								offset += 5;
								c = s.charAt(offset++);
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
							} else if (s.substr(offset -1, 6) === "PUBLIC") {
								offset += 5;
								c = s.charAt(offset++);
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
								while (seps_dtd.indexOf(c) === -1) {
									c = s.charAt(offset++);
								}
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
							}
							entityvalue = s.substring(offset, Math.min(index - 1, s.indexOf(c, offset)));
							offset += entityvalue.length + 1;
							c = s.charAt(offset++);
							doc.doctype.setEntity(name, entityvalue);
						} else if (s.substr(offset, 9) === "!NOTATION") {
							offset += 9;
							c = s.charAt(offset++);
							while (seps.indexOf(c) !== -1) {
								c = s.charAt(offset++);
							}
							name = "";
							while (seps_dtd.indexOf(c) === -1) {
								name += c;
								c = s.charAt(offset++);
							}
							while (seps.indexOf(c) !== -1) {
								c = s.charAt(offset++);
							}
							if (s.substr(offset - 1, 6) === "SYSTEM") {
								offset += 5;
								c = s.charAt(offset++);
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
							} else if (s.substr(offset -1, 6) === "PUBLIC") {
								offset += 5;
								c = s.charAt(offset++);
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
								while (seps_dtd.indexOf(c) === -1) {
									c = s.charAt(offset++);
								}
								while (seps.indexOf(c) !== -1) {
									c = s.charAt(offset++);
								}
							}
							if (c === '"' || c === "'") {
								notationvalue = s.substring(offset, Math.min(index - 1, s.indexOf(c, offset)));
								offset += notationvalue.length + 1;
								c = s.charAt(offset++);
							}
						}
						offset = s.indexOf(">", offset - 1) + 1;
						c = s.charAt(offset++);
					}
					index = s.indexOf(">", offset);
				}
				if (index !== offset) {
					if (index === -1) {
						index = end;
					}
					if (index === end) {
						break;
					}
					offset = index;
				}
				offset++;
			}
		} else if (s.charAt(offset) === "?") {
			offset++;
			c = s.charAt(offset++);
			name = "";
			while (seps_pi.indexOf(c) === -1) {
				name += c;
				c = s.charAt(offset++);
			}
			index = s.indexOf("?>", offset - 1);
			if (index === -1) {
				index = end;
			}
			if (name === "xml") {
			} else if (name !== "") {
				currnode.appendChild(doc.createProcessingInstruction(name, index === offset - 1 ? "" : s.substring(offset, index)));
			}
			if (index === end) {
				break;
			}
			offset = index + 2;
		} else if (s.charAt(offset) === "/") {
			offset++;
			c = s.charAt(offset++);
			name = "";
			while (seps_close.indexOf(c) === -1 && offset <= end) {
				name += c;
				c = s.charAt(offset++);
			}
			if (name === currnode.nodeName) {
				n = parents.pop();
				namespaces = {};
				for (prefix in n.namespaces) {
					if (n.namespaces.hasOwnProperty(prefix)) {
						namespaces[prefix] = n.namespaces[prefix];
					}
				}
				currnode = n.node;
			} else {
				while (parents.length !== 0) {
					n = parents.pop();
					if (name === n.node.nodeName) {
						namespaces = n.namespaces.slice(0);
						currnode = n.node;
						break;
					}
				}
			}
			offset = s.indexOf(">", offset - 1) + 1;
			if (offset === 0) {
				break;
			}
		} else {
			c = s.charAt(offset++);
			name = "";
			while (seps_elt.indexOf(c) === -1 && offset <= end) {
				name += c;
				c = s.charAt(offset++);
			}
			index = s.indexOf(">", offset - 1);
			if (name !== "") {
				newnamespaces = {};
				for (prefix in namespaces) {
					if (namespaces.hasOwnProperty(prefix)) {
						newnamespaces[prefix] = namespaces[prefix];
					}
				}
				attrs = {};
				while (true) {
					while (seps.indexOf(c) !== -1) {
						c = s.charAt(offset++);
					}
					if (c === "/" || c === ">" || offset === end) {
						break;
					}
					attrname = "";
					while (seps_attr.indexOf(c) === -1 && offset <= end) {
						attrname += c;
						c = s.charAt(offset++);
					}
					while (seps.indexOf(c) !== -1) {
						c = s.charAt(offset++);
					}
					if (c === "=") {
						c = s.charAt(offset++);
						while (seps.indexOf(c) !== -1) {
							c = s.charAt(offset++);
						}
						attrvalue = "";
						if (c === "'" || c === "\"") {
							attrvalue = s.substring(offset, Math.min(index - 1, s.indexOf(c, offset)));
							offset += attrvalue.length + 1;
							c = s.charAt(offset++);
						} else {
							while (seps_elt.indexOf(c) === -1 && offset <= end) {
								attrvalue += c;
								c = s.charAt(offset++);
							}
						}
					} else {
						attrvalue = attrname;
					}
					pindex = attrname.indexOf(":");
					prefix = pindex !== -1 ? attrname.substr(0, pindex) : " ";
					localName = pindex !== -1 ? attrname.substr(pindex + 1) : attrname;
					if (!attrs[prefix]) {
						attrs[prefix] = {};
					}
					attrs[prefix][localName] = attrvalue;
					if (prefix === "xmlns") {
						newnamespaces[localName] = attrvalue;
					} else if (prefix === " " && localName === "xmlns") {
						newnamespaces[" "] = attrvalue;
					}
				}
				pindex = name.indexOf(":");
				eltnode = doc.createElementNS(newnamespaces[pindex !== -1 ? name.substr(0, pindex) : " "], name);
				for (prefix in attrs) {
					if (attrs.hasOwnProperty(prefix)) {
						for (attrname in attrs[prefix]) {
							if (attrs[prefix].hasOwnProperty(attrname)) {
								attrnode = doc.createAttributeNS(prefix === "xmlns" || prefix === " " && attrname === "xmlns" ? "http://www.w3.org/2000/xmlns/" : prefix !== " " ? newnamespaces[prefix] : null, prefix !== " " ? prefix + ":" + attrname : attrname);
								eltnode.setAttributeNodeNS(attrnode);
								attrnode.appendChild(doc.createTextNode(Fleur.DocumentType.resolveEntities(doc.doctype, attrs[prefix][attrname])));
							}
						}
					}
				}
				currnode.appendChild(eltnode);
				if (s.charAt(offset - 1) !== "/") {
					parents.push({node: currnode, namespaces: namespaces});
					currnode = eltnode;
					namespaces = {};
					for (prefix in newnamespaces) {
						if (newnamespaces.hasOwnProperty(prefix)) {
							namespaces[prefix] = newnamespaces[prefix];
						}
					}
				}
			}
			offset = index + 1;
			if (offset === 0) {
				break;
			}
		}
	}
};

Fleur.DocumentType = function() {
	this.nodeType = Fleur.Node.DOCUMENT_TYPE_NODE;
	this.entities = new Fleur.NamedNodeMap();
	this.entities.ownerNode = this;
	this.notations = new Fleur.NamedNodeMap();
	this.notations.ownerNode = this;
};
Fleur.DocumentType.prototype = new Fleur.Node();
Object.defineProperties(Fleur.DocumentType.prototype, {
	nodeValue: {
		set: function(value) {},
		get: function() {
			return null;
		}
	}
});
Fleur.DocumentType.prototype.createEntity = function(name) {
	var node = new Fleur.Entity();
	node.localName = node.nodeName = name;
	return node;
}
Fleur.DocumentType.prototype.hasEntity = function(name) {
	return !!this.entities.getNamedItem(name);
};
Fleur.DocumentType.prototype.setEntity = function(name, value) {
	var entity;
	if (this.hasEntity(name)) {
		return;
	}
	entity = this.createEntity(name);
	entity.nodeValue = Fleur.DocumentType.resolveEntities(this, value);
	this.entities.setNamedItem(entity);
};
Fleur.DocumentType.prototype.getEntity = function(name) {
	var i = 0, l = this.entities.length;
	while (i < l) {
		if (this.entities[i].nodeName === name) {
			return this.entities[i].nodeValue;
		}
		i++;
	}
	return null;
};
Fleur.DocumentType.resolveEntities = function(doctype, s) {
	var offset = 0, index, entityname, entityvalue = null;
	while ((index = s.indexOf("&", offset)) !== -1) {
		entityname = s.substring(index + 1, s.indexOf(";", index + 1));
		switch (entityname) {
			case "amp":
				entityvalue = "&";
				break;
			case "lt":
				entityvalue = "<";
				break;
			case "gt":
				entityvalue = ">";
				break;
			default:
				if (entityname.charAt(0) === "#") {
					entityvalue = String.fromCharCode(parseInt(entityname.charAt(1).toLowerCase() === 'x' ? "0" + entityname.substr(1).toLowerCase() : entityname.substr(1)));
				} else if (doctype) {
					entityvalue = doctype.getEntity(entityname);
				}
		}
		if (entityvalue) {
			s = s.substr(0, index) + entityvalue + s.substr(index + entityname.length + 2);
			offset = index + entityvalue.length + 1;
		}
	}
	return s.split("\r\n").join("\n");
}

Fleur.DocumentFragment = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.DOCUMENT_FRAGMENT_NODE;
	this.nodeName = "#document-fragment";
};
Fleur.DocumentFragment.prototype = new Fleur.Node();
Object.defineProperties(Fleur.DocumentFragment.prototype, {
	nodeValue: {
		set: function(value) {},
		get: function() {
			return null;
		}
	}
});

Fleur.Nodes = function() {};

Fleur.DOMParser = function() {};
Fleur.DOMParser.prototype.parseFromString = function(s, mediatype) {
	var doc, impl, domSource = new Fleur.DOMImplementationSource();
	impl = domSource.getDOMImplementation("XML");
	doc = impl.createDocument();
	switch(mediatype) {
		default:
			doc._parseXMLFromString(s);
	}
	return doc;
};

Fleur.XMLSerializer = function() {};
Fleur.XMLSerializer.prototype.serializeToString = function(node) {
}

})();