(function(Fleur) {
"use strict";

Fleur.TypeInfo = function(typeNamespace, typeName) {
	this.typeNamespace = typeNamespace;
	this.typeName = typeName;
};
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

/**
 * @name Fleur.DOMException
 * @function
 * @param {Number} code
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
/**
 * @name Fleur.DOMConfiguration#canSetParameter
 * @function
 * @param {String} name
 * @param {String} value
 * @returns {Boolean}
 */
Fleur.DOMConfiguration.prototype.canSetParameter = function(name, value) {
	return this.parametersNames.contains(name) && (typeof this._parameters[name] === typeof value);
};
/**
 * @name Fleur.DOMConfiguration#setParameter
 * @function
 * @param {String} name
 * @param {String} value
 */
Fleur.DOMConfiguration.prototype.setParameter = function(name, value) {
	this._parameters[name] = value;
};
/**
 * @name Fleur.DOMConfiguration#getParameter
 * @function
 * @param {String} name
 * @returns {String}
 */
Fleur.DOMConfiguration.prototype.getParameter = function(name) {
	return this._parameters[name];
};

Fleur.DOMStringList = function() {};
Fleur.DOMStringList.prototype = new Array();
/**
 * @name Fleur.DOMStringList#item
 * @function
 * @param {Number} index
 * @return {String}
 */
Fleur.DOMStringList.prototype.item = function(index) {
	return this[index];
};
/**
 * @name Fleur.DOMStringList#contains
 * @function
 * @param {String} str
 * @returns {Boolean}
 */
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
/**
 * @name Fleur.NameList#contains
 * @function
 * @param {String} str
 * @returns {Boolean}
 */
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
/**
 * @param {String} namespaceURI
 * @param {String} name
 * @return {Boolean}
 */
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
/**
 * @name Fleur.NameList#getName
 * @function
 * @param {Number} index
 * @returns {String}
 */
Fleur.NameList.prototype.getName = function(index) {
	return this[index][1];
};
/**
 * @name Fleur.NameList#getNamespaceURI
 * @function
 * @param {Number} index
 * @returns {String}
 */
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
Fleur.Node.ARRAY_NODE = 131;
Fleur.Node.MAP_NODE = 132;
Fleur.Node.ENTRY_NODE = 133;
Fleur.Node.DOCUMENT_POSITION_DISCONNECTED = 1;
Fleur.Node.DOCUMENT_POSITION_PRECEDING = 2;
Fleur.Node.DOCUMENT_POSITION_FOLLOWING = 4;
Fleur.Node.DOCUMENT_POSITION_CONTAINS = 8;
Fleur.Node.DOCUMENT_POSITION_CONTAINED_BY = 16;
Fleur.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
Fleur.Node.QNameReg = /^([_A-Z][-_.\w]*:)?[_A-Z][-_.\w]*$/i;
Fleur.Node.QNameCharsReg = /^[-_.\w:]+$/i;
Fleur.Node.prefixReg = /^[-_.\w]+$/i;
Fleur.Node.JSNameReg = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[a-zA-Z_$][0-9a-zA-Z_$]*$/;
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
		case Fleur.Node.ENTRY_NODE:
			clone = this.ownerDocument.createEntry(this.nodeName);
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
		case Fleur.Node.MAP_NODE:
			clone = this.ownerDocument.createMap();
			li = this.entries.length;
			while (i < li) {
				clone.setEntryNode(this.entries[i++].cloneNode(false));
			}
			break;
		case Fleur.Node.SEQUENCE_NODE:
			clone = this.ownerDocument.createSequence();
			lj = this.childNodes.length;
			while (j < lj) {
				clone.appendChild(this.childNodes[j++].cloneNode(true));
			}
			break;
		case Fleur.Node.ARRAY_NODE:
			clone = this.ownerDocument.createArray();
			lj = this.childNodes.length;
			while (j < lj) {
				clone.appendChild(this.childNodes[j++].cloneNode(true));
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
Fleur.Node.prototype.hasEntries = function() {
	return !!this.entries && this.entries.length !== 0;
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
	var i = 0, j = 0, li, lj;
	if (!arg || this.nodeType !== arg.nodeType || this.nodeName !== arg.nodeName || this.localName !== arg.localName || this.namespaceURI !== arg.namespaceURI || this.prefix !== arg.prefix || this.nodeValue !== arg.nodeValue) {
		return false;
	}
	if (this.attributes) {
		li = this.attributes.length;
		if (!arg.attributes || arg.attributes.length !== li) {
			return false;
		}
		while (i < li) {
			if (!this.attributes[i].isEqualNode(arg.getAttributeNodeNS(this.attributes[i].namespaceURI, this.attributes[i].localName))) {
				return false;
			}
			i++;
		}
	}
	if (this.entries) {
		li = this.entries.length;
		if (!arg.entries || arg.entries.length !== li) {
			return false;
		}
		while (i < li) {
			if (!this.entries[i].isEqualNode(arg.getEntryNode(this.entries[i].nodeName))) {
				return false;
			}
			i++;
		}
	}
	if (this.childNodes) {
		lj = this.childNodes.length;
		if (!arg.childNodes || arg.childNodes.length !== lj) {
			return false;
		}
		while (j < lj) {
			if (!this.childNodes[j].isEqualNode(arg.childNodes[j])) {
				return false;
			}
			j++;
		}
	}
	if (this.nodeType === Fleur.Node.DOCUMENT_TYPE_NODE) {
		if (this.publicId !== arg.publicId || this.systemId !== arg.systemId || this.internalSubset !== arg.internalSubset) {
			return false;
		}
	}
	return true;
};
Fleur.Node.prototype.isSameNode = function(other) {
	return other === this;
};
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
	var i = 0;
	while (i < this.childNodes.length) {
		switch (this.childNodes[i].nodeType) {
			case Fleur.Node.ATTRIBUTE_NODE:
			case Fleur.Node.ELEMENT_NODE:
			case Fleur.Node.ENTRY_NODE:
			case Fleur.Node.SEQUENCE_NODE:
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
	if ( pos === 0 || pos === qualifiedName.length - 1 || (!namespaceURI && pos > 0)) {
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
Fleur.Element.prototype._serializeToString = function(indent) {
	var s, i, l;
	s = "<" + this.nodeName;
	for (i = 0, l = this.attributes.length; i < l; i++) {
		s += " " + this.attributes[i].nodeName + "=\"" + Fleur.XMLSerializer.escape(this.attributes[i].nodeValue).replace('"', "&quot;") + "\"";
	}
	if (this.childNodes.length === 0) {
		return s + "/>";
	}
	s += indent ? ">\n" : ">";
	for (i = 0, l = this.childNodes.length; i < l; i++) {
		s += Fleur.XMLSerializer._serializeToString(this.childNodes[i], indent, "    ");
	}
	return s + "</" + this.nodeName + ">";
};
*/
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
Fleur.Map = function() {
	Fleur.Node.apply(this);
	this.entries = new Fleur.NamedNodeMap();
	this.entries.ownerNode = this;
	this.nodeType = Fleur.Node.MAP_NODE;
};
Fleur.Map.prototype = new Fleur.Node();
Fleur.Map.prototype.getEntryNode = function(name) {
	var i = 0, l = this.entries.length;
	while (i < l) {
		if (this.entries[i].nodeName === name) {
			return this.entries[i];
		}
		i++;
	}
	return null;
};
Fleur.Map.prototype.hasEntry = function(name) {
	return !!this.entries.getNamedItem(name);
};
Fleur.Map.prototype.removeEntry = function(name) {
	this.entries.removeNamedItem(name);
};
Fleur.Map.prototype.removeEntryNode = function(oldEntry) {
	if (oldEntry.ownerMap !== this) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_FOUND_ERR);
	}
	this.entries.removeNamedItem(oldEntry.nodeName);
	return oldEntry;
};
Fleur.Map.prototype.setEntryNode = function(newEntry) {
	var n = this.entries.setNamedItem(newEntry);
	newEntry.ownerMap = this;
	return n;
};

Fleur.Entry = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.ENTRY_NODE;
};
Fleur.Entry.prototype = new Fleur.Node();

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

Fleur.Sequence = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.SEQUENCE_NODE;
};
Fleur.Sequence.prototype = new Fleur.Node();

Fleur.Array = function() {
	Fleur.Node.apply(this);
	this.nodeType = Fleur.Node.ARRAY_NODE;
};
Fleur.Array.prototype = new Fleur.Node();

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
/**
 * @name Fleur.Document#_adoptNode
 * @function
 * @param {Fleur.Node} source
 * @returns {Fleur.Node}
 */
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
/**
 * @name Fleur.Document#adoptNode
 * @function
 * @param {Fleur.Node} source
 * @returns {Fleur.Node}
 */
Fleur.Document.prototype.adoptNode = function(source) {
	if (source.nodeType === Fleur.Node.DOCUMENT_NODE || source.nodeType === Fleur.Node.DOCUMENT_TYPE_NODE) {
		throw new Fleur.DOMException(Fleur.DOMException.NOT_SUPPORTED_ERR);
	}
	if (source.nodeType === Fleur.Node.ATTRIBUTE_NODE) {
		source.ownerElement = null;
	}
	return this._adoptNode(source);
};
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
Fleur.Document.prototype.createSequence = function() {
	var node = new Fleur.Sequence();
	node._setOwnerDocument(this);
	node.childNodes = new Fleur.NodeList();
	node.children = new Fleur.NodeList();
	node.textContent = "";
	return node;
};
Fleur.Document.prototype.createArray = function() {
	var node = new Fleur.Array();
	node._setOwnerDocument(this);
	node.childNodes = new Fleur.NodeList();
	node.children = new Fleur.NodeList();
	node.textContent = "";
	return node;
};
Fleur.Document.prototype.createMap = function() {
	var node = new Fleur.Map();
	node._setOwnerDocument(this);
	return node;
};
Fleur.Document.prototype.createEntry = function(name) {
	var node = new Fleur.Entry();
	node._setOwnerDocument(this);
	node.childNodes = new Fleur.NodeList();
	node.children = new Fleur.NodeList();
	node.nodeName = node.localName = name;
	node.textContent = "";
	return node;
};
Fleur.Types = {
	"http://www.w3.org/2001/XMLSchema": {
		"string": new Fleur.TypeInfo("http://www.w3.org/2001/XMLSchema", "string"),
		"double": new Fleur.TypeInfo("http://www.w3.org/2001/XMLSchema", "double"),
		"boolean": new Fleur.TypeInfo("http://www.w3.org/2001/XMLSchema", "boolean"),
		"regex": new Fleur.TypeInfo("http://www.w3.org/2001/XMLSchema", "regex")
	}
};
Fleur.Type_string = Fleur.Types["http://www.w3.org/2001/XMLSchema"]["string"];
Fleur.Document.prototype.createTextNode = function(data) {
	var node = new Fleur.Text();
	node._setOwnerDocument(this);
	node.appendData(data);
	node.schemaTypeInfo = Fleur.Type_string;
	return node;
};
Fleur.Document.prototype.createTypedValueNode = function(typeNamespace, typeName, data) {
	var node = new Fleur.Text();
	node._setOwnerDocument(this);
	node.appendData(data);
	node.schemaTypeInfo = Fleur.Types[typeNamespace][typeName];
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
		case Fleur.Node.SEQUENCE_NODE:
			node = this.createSequence();
			lj = importedNode.childNodes.length;
			while (j < lj) {
				node.appendChild(this.importNode(importedNode.childNodes[j++], true));
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
Fleur.Document.prototype._serializeToString = function(indent) {
	var s, i, l;
	for (i = 0, l = this.childNodes.length; i < l; i++) {
		s += this._serializeToString(this.childNodes[i], indent, "");
	}
	return s;
};
/*
Fleur.Document.prototype.normalizeDocument = function() {
};
*/
/*
Fleur.Document.prototype.renameNode = function(n, namespaceURI, qualifiedName) {
};
*/
Fleur.Node.prototype._parseCSVFromString = function(s, sep, head) {
	var index, offset = 0, end, doc = this.ownerDocument || this, currnode = this, eltnode;
	var headers = [];
	var first = head;
	var col = 0;
	var rowcat = "";
	var row = "";
	sep = sep || ";";
	s = s.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
	if (s.charAt(s.length - 1) !== "\n") {
		s += "\n";
	}
	end = s.length;
	var currseq = doc.createSequence();
	while (offset !== end) {
		var v = "";
		if (s.charAt(offset) === '"') {
			offset++;
			do {
				if (s.charAt(offset) !== '"') {
					v += s.charAt(offset);
					offset++;
				} else {
					if (s.substr(offset, 2) === '""') {
						v += '"';
						offset += 2;
					} else {
						offset++;
						break;
					}
				}
			} while (offset !== end);
		} else {
			while (s.substr(offset, sep.length) !== sep && s.charAt(offset) !== "\n") {
				v += s.charAt(offset);
				offset++;
			}
		}
		if (first) {
			headers.push(v);
		} else {
			rowcat += v;
			if (head) {
				eltnode = doc.createElement(headers[col]);
				eltnode.appendChild(doc.createTextNode(v));
				currseq.appendChild(eltnode);
			} else {
				currseq.appendChild(doc.createTextNode(v));
			}
		}
		if (s.charAt(offset) === "\n") {
			if (!first && rowcat !== "") {
				currnode.appendChild(currseq);
				currseq = doc.createSequence();
			}
			first = false;
			col = 0;
			row = "";
			rowcat = "";
		} else {
			col++;
		}
		offset++;
	}
};
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
Fleur.Node._parseTextAdvance = function(n, states, grammar, selection) {
	for (var i = 0; i < states[n].length; i++) {
		var state = states[n][i];
		if (state[2] === state[1].length) {
			var join = [];
			var prevtext = false;
			for (var j = 0, l2 = state[4].length; j < l2 ; j++) {
				if (state[4][j] !== "") {
					if (state[1][j][0] === 2 && !state[1][j][2]) {
						if (prevtext && typeof (state[4][j][1][0]) === "string") {
							join[join.length - 1] += state[4][j][1][0];
						} else {
							join = join.concat(state[4][j][1]);
							prevtext = typeof (state[4][j][1][0]) === "string";
						}
					} else if (state[1][j][2]) {
						if (state[1][j][0] === 2) {
							join.push([state[1][j][2], state[4][j][1]]);
							prevtext = false;
						} else {
							var joinitem = state[4][j];
							if (prevtext) {
								join[join.length - 1] += joinitem;
							} else if (joinitem != "") {
								join.push(joinitem);
								prevtext = true;
							}
						}
					}
				}
			}
			state[4] = [[1, join]];
			for (var k = 0; k < states[state[3]].length; k++) {
				var state2 = states[state[3]][k];
				if (state2[1][state2[2]] && state2[1][state2[2]][0] === 2 && state2[1][state2[2]][1] === state[0]) {
					var data3 = state2[4].slice(0);
					data3.push(state[4][0]);
					states[n].push([state2[0], state2[1], state2[2] + 1, state2[3], data3]);
				}
			}
		} else {
			if (state[1][state[2]][0] === 2) {
				var next = state[1][state[2]][1];
				for (var i2 = 0, l2 = grammar[next].length; i2 < l2; i2++) {
					var r = grammar[next][i2];
					if (selection.indexOf(r) === -1) {
						if (r.length > 0) {
							selection.push(r);
							states[n].push([next, r, 0, n, []]);
						} else {
							var data4 = state[4].slice(0);
							data4.push("");
							states[n].push([state[0], state[1], state[2] + 1, state[3], data4]);
						}
					}
				}
			}
		}
	}
};
Fleur.Node.prototype._parseTextFromString = function(s, grammar) {
	var states = [[]];
	var selection = [];
	for (var i = 0, l = grammar[0][0].length; i < l; i++) {
		selection[i] = grammar[0][0][i];
		states[0][i] = [0, grammar[0][0][i], 0, 0, []];
	}
	Fleur.Node._parseTextAdvance(0, states, grammar[0], selection);
	for (var j = 0; j < s.length; j++) {
		states[j + 1] = [];
		for (var k = 0; k < states[j].length; k++) {
			var state = states[j][k];
			var c = s.charAt(j);
			if (state[1][state[2]]) {
				if ((state[1][state[2]][0] === 0 && state[1][state[2]][1] === c) || (state[1][state[2]][0] === 1 && state[1][state[2]][1].test(c))) {
					var data = state[4].slice(0);
					data.push(c);
					states[j + 1].push([state[0], state[1], state[2] + 1, state[3], data]);
				}
			}
		}
		Fleur.Node._parseTextAdvance(j + 1, states, grammar[0], []);
		if (states[states.length - 1].length === 0) {
			return "error";
		}
	}
	var laststates = states[states.length - 1];
	for (i = 0, l = laststates.length; i < l; i++) {
		if (laststates[i][0] === 0 && laststates[i][1].length === laststates[i][2] && laststates[i][3] === 0) {
			this._parseFromArray(grammar[1], [laststates[i][4][0]]);
			break;
		}
	}
	return this;
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
};
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
};

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
Fleur.Node.prototype._parseFromArray = function(names, os) {
	var i, l, o, n, name, doc = this.ownerDocument || this;
	for (i = 0, l = os.length; i < l; i++) {
		o = os[i];
		if (typeof o === "string") {
			n = doc.createTextNode(o);
		} else {
			name = names[1][o[0]];
			switch (name[0]) {
				case Fleur.Node.ELEMENT_NODE:
					n = doc.createElementNS(names[0][name[1]], name[2]);
					n._parseFromArray(names, o[1]);
					break;
				case Fleur.Node.ATTRIBUTE_NODE:
					n = doc.createAttributeNS(names[0][name[1]], name[2]);
					n.nodeValue = o[1];
					this.setAttributeNodeNS(n);
					continue;
				case Fleur.Node.CDATA_NODE:
					n = doc.createCDATASection(o[1]);
					break;
				case Fleur.Node.PROCESSING_INSTRUCTION_NODE:
					n = doc.createProcessingInstruction(o[1], o[2]);
					break;
				case Fleur.Node.COMMENT_NODE:
					n = doc.createComment(o[1]);
					break;
			}
		}
		this.appendChild(n);
	}
	return this;
};
Fleur.DOMParser.prototype.parseFromArray = function(o) {
	var doc, impl, domSource = new Fleur.DOMImplementationSource();
	impl = domSource.getDOMImplementation("XML");
	doc = impl.createDocument();
	return doc._parseFromArray(o[0], o[1]);
};
Fleur.Node.prototype._parseFromJSON = function(o) {
	if (o === null) {
		return;
	}
	var doc = this.ownerDocument || this, n;
	switch (typeof o) {
		case "string":
			n = doc.createTextNode(o);
			break;
		case "number":
			n = doc.createTypedValueNode("http://www.w3.org/2001/XMLSchema", "double", o);
			break;
		case "boolean":
			n = doc.createTypedValueNode("http://www.w3.org/2001/XMLSchema", "boolean", o);
			break;
		default:
			if (o instanceof RegExp) {
				n = doc.createTypedValueNode("http://www.w3.org/2001/XMLSchema", "regex", o);
			} else if (typeof o.length === "number") {
				n = doc.createArray();
				for (var i = 0, l = o.length; i < l; i++) {
					n._parseFromJSON(o[i]);
				}
			} else {
				n = doc.createMap();
				for (var k in o) {
					if (o.hasOwnProperty(k)) {
						var e = doc.createEntry(k);
						n.setEntryNode(e);
						e._parseFromJSON(o[k]);
					}
				}
			}
	}
	this.appendChild(n);
	return this;
};
Fleur.DOMParser.prototype.parseFromJSON = function(o) {
	var doc, impl, domSource = new Fleur.DOMImplementationSource();
	impl = domSource.getDOMImplementation("XML");
	doc = impl.createDocument();
	return doc._parseFromJSON(o);
};
Fleur.DOMParser.prototype.parseFromString = function(s, mediatype, grammar) {
	var doc, impl, domSource = new Fleur.DOMImplementationSource();
	impl = domSource.getDOMImplementation("XML");
	doc = impl.createDocument();
	switch(mediatype) {
		case "text/csv":
			doc._parseCSVFromString(s);
			break;
		case "application/xml":
		case "text/xml":
			doc._parseXMLFromString(s);
			break;
		default:
			doc._parseTextFromString(s, grammar);
	}
	return doc;
};

Fleur.Serializer = function() {};
Fleur.Serializer.escapeXML = function(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
Fleur.Serializer.prototype._serializeXMLToString = function(node, indent, offset) {
	var s, i, l;
	switch (node.nodeType) {
		case Fleur.Node.ELEMENT_NODE:
			s = (indent ? offset + "<" : "<") + node.nodeName;
			if (indent) {
				var names = [];
				for (i = 0, l = node.attributes.length; i < l; i++) {
					names.push(node.attributes[i].nodeName);
				}
				names.sort();
				for (i = 0, l = names.length; i < l; i++) {
					s += " " + names[i] + "=\"" + Fleur.Serializer.escapeXML(node.getAttribute(names[i])).replace('"', "&quot;") + "\"";
				}
			} else {
				for (i = 0, l = node.attributes.length; i < l; i++) {
					s += " " + node.attributes[i].nodeName + "=\"" + Fleur.Serializer.escapeXML(node.attributes[i].nodeValue).replace('"', "&quot;") + "\"";
				}
			}
			if (node.childNodes.length === 0) {
				return s + (indent ? "/>\n" : "/>");
			}
			s += indent && (node.childNodes[0].nodeType !== Fleur.Node.TEXT_NODE || node.childNodes[0].data.match(/^[ \t\n\r]*$/)) ? ">\n" : ">";
			for (i = 0, l = node.childNodes.length; i < l; i++) {
				s += this._serializeXMLToString(node.childNodes[i], indent, offset + "  ");
			}
			return s + (indent && (node.childNodes[0].nodeType !== Fleur.Node.TEXT_NODE || node.childNodes[0].data.match(/^[ \t\n\r]*$/)) ? offset + "</" : "</") + node.nodeName + (indent ? ">\n" : ">");
		case Fleur.Node.TEXT_NODE:
			if (indent && node.data.match(/^[ \t\n\r]*$/) && node.parentNode.childNodes.length !== 1) {
				return "";
			}
			return Fleur.Serializer.escapeXML(node.data);
		case Fleur.Node.CDATA_NODE:
			return (indent ? offset + "<![CDATA[" : "<![CDATA[") + node.data + (indent ? "]]>\n" : "]]>");
		case Fleur.Node.PROCESSING_INSTRUCTION_NODE:
			return (indent ? offset + "<?" : "<?") + node.nodeName + " " + node.nodeValue + (indent ? "?>\n" : "?>");
		case Fleur.Node.COMMENT_NODE:
			return (indent ? offset + "<!--" : "<!--") + node.data + (indent ? "-->\n" : "-->");
		case Fleur.Node.DOCUMENT_NODE:
			s = '<?xml version="1.0" encoding="UTF-8"?>\r\n';
			for (i = 0, l = node.childNodes.length; i < l; i++) {
				s += this._serializeXMLToString(node.childNodes[i], indent, offset);
			}
			return s;
	}
};
Fleur.Serializer.escapeJSON = function(s) {
try {
	return s.replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\\/g, "\\");
} catch (e) { return "";}
};
Fleur.Serializer.prototype._serializeJSONToString = function(node, indent, offset, inline, comma) {
	var s, i, l, quote;
	switch (node.nodeType) {
		case Fleur.Node.MAP_NODE:
			s = indent && !inline ? offset + "{" : "{";
			if (node.entries.length === 0) {
				return s + (indent ? "}" + comma + "\n" : "}" + comma);
			}
			if (indent) {
				s += "\n";
			}
			if (indent) {
				var names = [];
				for (i = 0, l = node.entries.length; i < l; i++) {
					names.push(node.entries[i].nodeName);
				}
				names.sort();
				for (i = 0, l = names.length; i < l; i++) {
					s += this._serializeJSONToString(node.getEntryNode(names[i]), indent, offset + "  ", false, (i === l - 1 ? "" : ","));
				}
			} else {
				for (i = 0, l = node.entries.length; i < l; i++) {
					s += this._serializeJSONToString(node.entries[i], indent, offset + "  ", false, (i === l - 1 ? "" : ","));
				}
			}
			return s + (indent ? offset + "}" + comma + "\n" : "}" + comma);
		case Fleur.Node.ENTRY_NODE:
			if (indent && Fleur.Node.JSNameReg.test(node.nodeName)) {
				s = offset + node.nodeName + ": ";
			} else {
				s = (indent ? offset + '"' : '"') + Fleur.Serializer.escapeJSON(node.nodeName) + '":' + (indent ? " " : "");
			}
			s += this._serializeJSONToString(node.firstChild, indent, offset, true, comma);
			return s;
		case Fleur.Node.TEXT_NODE:
			quote = node.schemaTypeInfo === Fleur.Type_string ? '"' : node.schemaTypeInfo === Fleur.Type_regex ? '/' : "";
			return (indent && !inline ? offset + quote : quote) + Fleur.Serializer.escapeJSON(node.data) + quote + comma + (indent ? "\n" : "");
		case Fleur.Node.ARRAY_NODE:
		case Fleur.Node.SEQUENCE_NODE:
			s = indent && !inline ? offset + "[" : "[";
			if (node.childNodes.length === 0) {
				return s + (indent ? "]" + comma + "\n" : "]" + comma);
			}
			if (indent) {
				s += "\n";
			}
			for (i = 0, l = node.childNodes.length; i < l; i++) {
				s += this._serializeJSONToString(node.childNodes[i], indent, offset + "  ", false, (i === l - 1 ? "" : ","));
			}
			return s + (indent ? offset + "]" + comma + "\n" : "]" + comma);
		case Fleur.Node.DOCUMENT_NODE:
			s = "";
			for (i = 0, l = node.childNodes.length; i < l; i++) {
				s += this._serializeJSONToString(node.childNodes[i], indent, offset, false, "");
			}
			return s;
	}
};
Fleur.Serializer.prototype.serializeToString = function(node, mediatype, indent) {
	switch (mediatype) {
		case "application/xml":
			var ser = this._serializeXMLToString(node, indent, "");
			if (indent && ser.charAt(ser.length - 1) === "\n") {
				ser = ser.substr(0, ser.length - 1);
			}
			return ser;
		case "application/json":
		case "text/json":
			var ser = this._serializeJSONToString(node, indent, "", "");
			if (indent && ser.charAt(ser.length - 1) === "\n") {
				ser = ser.substr(0, ser.length - 1);
			}
			return ser;
	}
};

Fleur.XMLSerializer = function() {};
Fleur.XMLSerializer.prototype = new Fleur.Serializer();
Fleur.XMLSerializer.prototype.serializeToString = function(node, indent) {
	return Fleur.Serializer.prototype.serializeToString.call(this, node, "application/xml", indent);
};

Fleur.XPathEvaluator = function() {};
Fleur.XPathEvaluator._precedence = "././/.;0.!.;1.~+.~-.;2.cast as.;3.castable as.;4.treat as.;5.instance of.;6.intersect.except.;7.|.union.;8.div.mod.*.idiv.;9.+.-.;10.to;11.||.;12.eq.ne.lt.le.gt.ge.<.>.<=.>=.is.<<.>>.=.!=.;13.and.;14.or.;15.for.let.some.every.then.else.in.:=.return.satisfies.;16.,.;17.";
Fleur.XPathEvaluator._opcodes = "./;stepExpr.|;unionOp.union;unionOp.div;divOp.mod;modOp.*;multiplyOp.idiv;idivOp.+;addOp.-;subtractOp.eq;eqOp.ne;neOp.lt;ltOp.le;leOp.gt;gtOp.ge;geOp.<;lessThanOp.>;greaterThanOp.<=;lessThanOrEqualOp.>=;greaterThanOrEqualOp.is;isOp.<<;nodeBeforeOp.>>;nodeAfterOp.=;equalOp.!=;notEqualOp.and;andOp.or;orOp.,;argExpr.";
Fleur.XPathEvaluator._skipComment = function(s, offset) {
	var i = offset;
	var c = s.charAt(i);
	var d = s.charAt(i + 1);
	do {
		if (c === "(" && d === ":") {
			i = Fleur.XPathEvaluator._skipComment(s, i + 2);
		} else if (c === ":" && d === ")") {
			return i + 1;
		}
		c = s.charAt(++i);
		d = s.charAt(i + 1);
	} while (true);
};
Fleur.XPathEvaluator._skipSpaces = function(s, offset) {
	var i = offset;
	var c = s.charAt(i);
	do {
		if (c === "(" && s.charAt(i + 1) === ":") {
			i = skipComment(s, i + 2);
		} else if (c !== "\n" && c !== "\r" && c !== "\t" && c !== " ") {
			return i;
		}
		c = s.charAt(++i);
	} while (true);
};
Fleur.XPathEvaluator._getName = function(s) {
	var i = 0;
	var o = s.charAt(0);
	while (o !== "" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:*{".indexOf(o) !== -1) {
		if (o === "*") {
			if (i > 0 && (s.charAt(i - 1) === ":" || s.charAt(i - 1) === "}")) {
				break;
			} else if (s.charAt(i + 1) !== ":") {
				if (i === 0) {
					i++;
				}
				break;
			}
		}
		if (o === "{") {
			while (o !== "" && o !== "}") {
				o = s.charAt(++i);
			}
		}
		o = s.charAt(++i);
	}
	return s.substr(0, i);
};
Fleur.XPathEvaluator._getNameStep = function(s, attr) {
	var n = Fleur.XPathEvaluator._getName(s);
	var aind = n.indexOf("::");
	var axis = aind !== -1 ? n.substr(0, aind) : attr ? "attribute" : "child";
	var n2 = aind !== -1 ? n.substr(aind + 2) : n;
	var eq = n2.substr(0, 2) === "Q{";
	var sind = eq ? n2.indexOf("}") : n2.indexOf(":");
	var n3 = sind !== -1 ? n2.substr(sind + 1) : n2;
	var nsp = eq ? n2.substr(2, sind - 2) : sind !== -1 ? n2.substr(0, sind) : "";
	var ntest = n3 === "*" || nsp === "*" ? "[XQueryX.Wildcard,[" + (n3 !== "*" ? "[XQueryX.star,[]],[XQueryX.NCName,['" + n3 + "']]" : "") + "]]" : "[XQueryX.nameTest,['" + n3 + "'" + (eq || sind !== -1 ? ",[" + (eq ? "XQueryX.URI" : "XQueryX.prefix") + ",['" + nsp + "']]" : "") + "]]";
	return (n.length + attr) + ".[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['" + axis + "']]," + ntest + "]]]]";
};
Fleur.XPathEvaluator._pathExprFormat = function(s, p) {
	if (s.substr(0, 19) === "[XQueryX.pathExpr,[") {
		return s.substr(19, s.length - 23) + p + "]]";
	}
	return "[XQueryX.stepExpr,[[XQueryX.filterExpr,[" + s + "]]" + p + "]]";
};
Fleur.XPathEvaluator._calc = function(args, ops, opprec) {
	if (ops === "" || parseInt(ops.split(".")[1], 10) > opprec) {
		return args.length + "." + args + ops.length + "." + ops;
	}
	var op0 = ops.substr(ops.indexOf(".") + 1, parseInt(ops.split(".")[0], 10));
	var op = op0.substr(op0.indexOf(".") + 1);
	var arg2len = args.substr(0, args.indexOf("."));
	var arg2val = args.substr(args.indexOf(".") + 1).substr(0, parseInt(arg2len, 10));
	var args3 = args.substr(arg2len.length + 1 + parseInt(arg2len, 10));
	var arg1len = args3.substr(0, args3.indexOf("."));
	var arg1val = args3.substr(args3.indexOf(".") + 1).substr(0, parseInt(arg1len, 10));
	var arg;
	switch (op) {
		case ",":
			if (ops.substr(0, 13) === "4.17.,5.999.(") {
				if (arg1val.substr(0, 20) === "[XQueryX.arguments,[") {
					arg = arg1val.substr(0, arg1len - 2) + "," + arg2val + "]]";
				} else {
					arg = "[XQueryX.arguments,[" + arg1val + "," + arg2val + "]]";
				}
			} else if (ops === "4.17.,") {
				if (arg1val.substr(0, 23) === "[XQueryX.sequenceExpr,[") {
					arg = arg1val.substr(0, arg1len - 2) + "," + arg2val + "]]";
				} else {
					arg = "[XQueryX.sequenceExpr,[" + arg1val + "," + arg2val + "]]";
				}
			} else {
				arg = arg1val + "," + arg2val;
			}
			break;
		case "//":
			arg = "[XQueryX.pathExpr,[" + Fleur.XPathEvaluator._pathExprFormat(arg1val, "") + ",[XQueryX.stepExpr,[[XQueryX.xpathAxis,['descendant-or-self']],[XQueryX.anyKindTest,[]]]]," + Fleur.XPathEvaluator._pathExprFormat(arg2val, "") + "]]";
			break;
		case "/":
			arg = "[XQueryX.pathExpr,[" + Fleur.XPathEvaluator._pathExprFormat(arg1val, "") + (arg2val !== "" ? "," + Fleur.XPathEvaluator._pathExprFormat(arg2val, "") : "") + "]]";
			break;
		case "!":
			arg = "[XQueryX.simpleMapExpr,[[XQueryX.pathExpr,[" + Fleur.XPathEvaluator._pathExprFormat(arg1val, "") + "]],[XQueryX.pathExpr,[" + Fleur.XPathEvaluator._pathExprFormat(arg2val, "") + "]]]]";
			break;
		case "|":
			arg = "[XQueryX.unionOp,[[XQueryX.firstOperand,[" + arg1val + "]],[XQueryX.secondOperand,[" + arg2val + "]]]]";
			break;
		case "to":
			arg = "[XQueryX.rangeSequenceExpr,[[XQueryX.startExpr,[" + arg1val + "]],[XQueryX.endExpr,[" + arg2val + "]]]]";
			break;
		case "~-":
			arg = "[XQueryX.unaryMinusOp,[[XQueryX.operand,[" + arg2val + "]]]]";
			break;
		case "~+":
			arg = "[XQueryX.unaryPlusOp,[[XQueryX.operand,[" + arg2val + "]]]]";
			break;
		case "in":
			if (ops.substr(ops.length - 7) === "5.999.q") {
				arg = "[XQueryX.quantifiedExprInClause,[[XQueryX.typedVariableBinding,[[XQueryX.varName,[" + arg1val.substr(0, arg1val.length - 4).substr(32) + "]]]],[XQueryX.sourceExpr,[" + arg2val + "]]]]";
			} else {
				arg = "[XQueryX.forClauseItem,[[XQueryX.typedVariableBinding,[[XQueryX.varName,[" + arg1val.substr(0, arg1val.length - 4).substr(32) + "]]]],[XQueryX.forExpr,[" + arg2val + "]]]]";
			}
			break;
		case ":=":
			arg = "[XQueryX.letClauseItem,[[XQueryX.typedVariableBinding,[[XQueryX.varName,[" + arg1val.substr(0, arg1val.length - 4).substr(32) + "]]]],[XQueryX.letExpr,[" + arg2val + "]]]]";
			break;
		case "return":
			arg = arg1val.substr(0, arg1val.length - 2) + ",[XQueryX.returnClause,[" + arg2val + "]]]]";
			break;
		case "satisfies":
			arg = arg1val.substr(0, arg1val.length - 2) + ",[XQueryX.predicateExpr,[" + arg2val + "]]]]";
			break;
		case "cast as":
			var arg2val2 = arg2val.substr(arg2val.indexOf("[XQueryX.nameTest,") + 18);
			var arg2val3 = "[XQueryX.atomicType," + arg2val2.substr(0, arg2val2.length - 4);
			arg = "[XQueryX.castExpr,[[XQueryX.argExpr,[" + arg1val + "]],[XQueryX.singleType,[" + arg2val3 + "]]]]";
			break;
		case "castable as":
			var arg2val2 = arg2val.substr(arg2val.indexOf("[XQueryX.nameTest,") + 18);
			var arg2val3 = "[XQueryX.atomicType," + arg2val2.substr(0, arg2val2.length - 4);
			arg = "[XQueryX.castableExpr,[[XQueryX.argExpr,[" + arg1val + "]],[XQueryX.singleType,[" + arg2val3 + "]]]]";
			break;
		case "treat as":
			var arg2val2 = arg2val.substr(arg2val.indexOf("[XQueryX.elementTest,"));
			var arg2val3 = "[XQueryX.sequenceType,[" + arg2val2.substr(0, arg2val2.length - 2);
			arg = "[XQueryX.treatExpr,[[XQueryX.argExpr,[" + arg1val + "]]," + arg2val3 + "]]";
			break;
		case "instance of":
		case "instance of+":
		case "instance of?":
		case "instance of*":
			var occ = op.charAt(11);
			var arg2val2, arg2val3;
			if (arg2val.indexOf("[XQueryX.nameTest,") !== -1) {
				arg2val2 = arg2val.substr(arg2val.indexOf("[XQueryX.nameTest,") + 18);
				arg2val3 = "[XQueryX.atomicType," + arg2val2.substr(0, arg2val2.length - 4);
			} else if (arg2val.indexOf("[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['child']],") !== -1) {
				arg2val2 = arg2val.substr(arg2val.indexOf("[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['child']],") + 68);
				arg2val3 = arg2val2.substr(0, arg2val2.length - 4);
			} else {
				arg2val2 = arg2val.substr(arg2val.indexOf("[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['attribute']],") + 72);
				arg2val3 = arg2val2.substr(0, arg2val2.length - 4);
			}
			arg = "[XQueryX.instanceOfExpr,[[XQueryX.argExpr,[" + arg1val + "]],[XQueryX.sequenceType,[" + arg2val3 + (occ !== "" ? ",[XQueryX.occurrenceIndicator,['" + occ + "']]" : "") + "]]]]";
			break;
		case "then":
			if (arg1val.substr(0, 77) === "[XQueryX.functionCallExpr,[[XQueryX.functionName,['if']],[XQueryX.arguments,[") {
				arg = "[XQueryX.ifThenElseExpr,[[XQueryX.ifClause,[" + arg1val.substr(0, arg1val.length - 4).substr(arg1val.indexOf(",[XQueryX.arguments,[") + 21) + "]],[XQueryX.thenClause,[" + arg2val + "]]]]";
			}
			break;
		case "else":
			if (arg1val.substr(0, 24) === "[XQueryX.ifThenElseExpr,") {
				arg = arg1val.substr(0, arg1val.length - 2) + ",[XQueryX.elseClause,[" + arg2val + "]]]]";
			}
			break;
		default:
			var opcode0 = Fleur.XPathEvaluator._opcodes.substr(Fleur.XPathEvaluator._opcodes.indexOf("." + op + ";") + op.length + 2);
			var opcode = opcode0.substr(0, opcode0.indexOf("."));
			arg = "[XQueryX." + opcode + ",[[XQueryX.firstOperand,[" + arg1val + "]],[XQueryX.secondOperand,[" + arg2val + "]]]]";
	}
	var args2 = arg.length + "." + arg + args3.substr(arg1len.length + 1 + parseInt(arg1len, 10));
	return Fleur.XPathEvaluator._calc(args2, ops.substr(ops.indexOf(".") + 1).substr(parseInt(ops.substr(0, ops.indexOf(".")), 10)), opprec);
};
Fleur.XPathEvaluator._testFormat = function(s, namecode) {
	var arg1, arg2, arg20;
	if (s === "") {
		return "";
	}
	if (s.indexOf(",[XQueryX.pathExpr,[") !== -1) {
		arg1 = s.substr(0, s.indexOf(",[XQueryX.pathExpr,["));
		arg20 = s.substr(s.indexOf(",[XQueryX.pathExpr,[") + 1);
		arg200 = arg20.substr(arg20.indexOf("[XQueryX.nameTest,['") + 19);
		arg2 = "," + "[XQueryX.typeName,[" + arg200.substr(0, arg200.length - 6) + "]]";
	} else {
		arg1 = s;
		arg2 = "";
	}
	var arg120 = arg1.indexOf("[XQueryX.nameTest,['") !== -1 ? arg1.substr(arg1.indexOf("[XQueryX.nameTest,['") + 19) : "[XQueryX.star,[]]";
	var arg12 = "[" + namecode + ",[" + (arg120 === "[XQueryX.star,[]]" ? arg120 : "[XQueryX.QName,[" + arg120.substr(0, arg120.length - 6) + "]]") + "]]";
	return arg12 + arg2;
};
Fleur.XPathEvaluator._getPredParam = function(c, s, l, arg) {
	l = l || 0;
	var p;
	var t = Fleur.XPathEvaluator._xp2js(s, "", l === 0 ? "" : arg.substr(0, 45) === "[XQueryX.quantifiedExpr,[[XQueryX.quantifier," ? "5.999.q" : "5.999.(");
	var plen = s.length - parseInt(t.substr(0, t.indexOf(".")), 10) + 1;
	if (t.indexOf("~~~~") !== -1) {
		var t0 = t + "~#~#";
		t0 = t0.substr(0, t0.indexOf("~#~#"));
		t0 = t0.replace('"', "");
		var msg = '"~~~~' + t0.substr(t0.indexOf("~~~~") + 4) + "in '" + s + "'~#~#" + '"';
		p = plen + "." + msg;
	} else if (t === "") {
		var msg2 = '"' + "~~~~Unrecognized expression '" + s + "'~#~#" + '"';
		p = plen + "." + msg2;
	} else if (c === "(" ) {
		if (arg.substr(0, 59) === "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['") {
			var fname0 = arg.substr(arg.indexOf("[XQueryX.nameTest,['") + 19);
			var fname = fname0.substr(0, fname0.length - 6);
			var fargs = t.substr(t.indexOf(".") + 1);
			var fargs2 = fargs.substr(0, 20) === "[XQueryX.arguments,[" ? fargs.substr(20, fargs.length - 22) : fargs;
			var parg0, parg;
			switch (fname) {
				case "'attribute'":
					parg = Fleur.XPathEvaluator._testFormat(fargs2, "XQueryX.attributeName");
					p = plen + "." + "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['attribute']],[XQueryX.attributeTest,[" + parg + "]]]]]]";
					break;
				case "'comment'":
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['comment']]]]")) + "[XQueryX.commentTest,[]]]]]]";
					break;
				case "'document-node'":
					if (fargs2 !== "") {
						var parg0 = fargs2.substr(fargs2.indexOf("[XQueryX.elementTest,["));
						parg = parg0.substr(0, parg0.length - 4);
					} else {
						parg = "";
					}
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['document-node']]]]")) + "[XQueryX.documentTest,[" + parg + "]]]]]]";
					break;
				case "'element'":
					parg = testFormat(fargs2, "XQueryX.elementName");
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['element']]]]")) + "[XQueryX.elementTest,[" + parg + "]]]]]]";
					break;
				case "'function'":
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['function']]]]")) + "[33,[]]]]]]";
					break;
				case "'namespace-node'":
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['namespace-node']]]]")) + "[XQueryX.namespaceTest,[]]]]]]";
					break;
				case "'node'":
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['node']]]]")) + "[XQueryX.anyKindTest,[]]]]]]";
					break;
				case "'processing-instruction'":
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['processing-instruction']]]]")) + "[XQueryX.piTest,[]]]]]]";
					break;
				case "'schema-attribute'":
					parg0 = fargs.substr(fargs.indexOf("[XQueryX.nameTest,['") + 19);
					parg = parg0.substr(0, parg0.length - 6);
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['schema-attribute']]]]")) + "[XQueryX.schemaAttributeTest,[" + parg + "]]]]]]";
					break;
				case "'schema-element'":
					parg0 = fargs.substr(fargs.indexOf("[XQueryX.nameTest,['") + 19);
					parg = parg0.substr(0, parg0.length - 6);
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['schema-element']]]]")) + "[XQueryX.schemaElementTest,[" + parg + "]]]]]]";
					break;
				case "'text'":
					p = plen + "." + arg.substr(0, arg.indexOf("[XQueryX.nameTest,['text']]]]")) + "[XQueryX.textTest,[]]]]]]";
					break;
				default:
					p = plen + ".[XQueryX.functionCallExpr,[[XQueryX.functionName,[" + fname + "]],[XQueryX.arguments,[" + fargs2 + "]]]]";
			}
		} else if (arg.substr(0, 59) === "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.filterExpr,[") {
			var arg1, arg2, arg20;
			if (arg.indexOf(",[XQueryX.predicates,[") !== -1) {
				arg1 = arg.substr(0, arg.indexOf(",[XQueryX.predicates,[")).substr(59);
				arg20 = arg.substr(arg.indexOf(",[XQueryX.predicates,[") + 22);
				arg2 = arg20.substr(0, arg20.length - 6);
			} else {
				arg1 = arg.substr(0, arg.length - 8).substr(59);
				arg2 = "";
			}
			var fargs = t.substr(t.indexOf(".") + 1);
			var fargs2 = fargs.substr(0, 20) === "[XQueryX.arguments,[" ? fargs.substr(20, fargs.length - 22) : fargs;
			p = plen + ".[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.filterExpr,[[XQueryX.dynamicFunctionInvocationExpr,[[XQueryX.functionItem,[" + arg1 + (arg2 === "" ? "" : ",[XQueryX.predicates,[" + arg2 + "]]") + (fargs2 === "" ? "" : ",[XQueryX.arguments,[" + fargs2 + "]]") + "]]]]]]]]";
		} else if (arg === "[XQueryX.flworExpr,[[XQueryX.forClause,[]]]]") {
			var fargs = t.substr(t.indexOf(".") + 1);
			var fargs2 = fargs.substr(0, 20) === "[XQueryX.arguments,[" ? fargs.substr(20, fargs.length - 22) : fargs;
			p = plen + ".[XQueryX.flworExpr,[[XQueryX.forClause,[" + fargs2 + "]]]]";
		} else if (arg === "[XQueryX.flworExpr,[[XQueryX.letClause,[]]]]") {
			var fargs = t.substr(t.indexOf(".") + 1);
			var fargs2 = fargs.substr(0, 20) === "[XQueryX.arguments,[" ? fargs.substr(20, fargs.length - 22) : fargs;
			p = plen + ".[XQueryX.flworExpr,[[XQueryX.letClause,[" + fargs2 + "]]]]";
		} else if (arg.substr(0, 45) === "[XQueryX.quantifiedExpr,[[XQueryX.quantifier,") {
			var fargs = t.substr(t.indexOf(".") + 1);
			var fargs2 = fargs.substr(0, 20) === "[XQueryX.arguments,[" ? fargs.substr(20, fargs.length - 22) : fargs;
			p = plen + "." + arg.substr(0, arg.length - 2) + "," + fargs2 + "]]";
		} else if (arg !== "") {
			var fargs = t.substr(t.indexOf(".") + 1);
			var fargs2 = fargs.substr(0, 20) === "[XQueryX.arguments,[" ? fargs.substr(20, fargs.length - 22) : fargs;
			p = plen + ".[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.filterExpr,[[XQueryX.dynamicFunctionInvocationExpr,[[XQueryX.functionItem,[" + arg + "]]" + (fargs2 === "" ? "" : ",[XQueryX.arguments,[" + fargs2 + "]]") + "]]]]]]]]";
		} else {
			p = plen + "." + t.substr(t.indexOf(".") + 1);
		}
	} else {
		//predicates
		if (arg.substr(0, 19) !== "[XQueryX.pathExpr,[") {
			arg = "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.filterExpr,[" + arg + "]]]]]]";
		}
		if (arg.indexOf(",[XQueryX.predicates,[") === -1) {
			p = plen + "." + arg.substr(0, arg.length - 4) + ",[XQueryX.predicates,[" + t.substr(t.indexOf(".") + 1) + "]]]]]]";
		} else {
			p = plen + "." + arg.substr(0, arg.length - 6) + "," + t.substr(t.indexOf(".") + 1) + "]]]]]]";
		}
	}
	if (s.charAt(plen - 1) === "(" || s.charAt(plen - 1) === "[") {
		return Fleur.XPathEvaluator._getPredParam(s.charAt(plen - 1), s.substr(plen), l + plen, p.substr(p.indexOf(".") + 1));
	}
	return (l + plen) + "." + p.substr(p.indexOf(".") + 1);
};
Fleur.XPathEvaluator._getPredParams = function(s, len, arg) {
	var i = Fleur.XPathEvaluator._skipSpaces(s, 0);
	if (s.charAt(i) === "(" || s.charAt(i) === "[") {
		return Fleur.XPathEvaluator._getPredParam(s.charAt(i), s.substr(i + 1), len + i, arg);
	}
	return (len + i) + "." + arg;
};
Fleur.XPathEvaluator._getNumber = function(s, r) {
	r = r || "";
	if (s === "") {
		return r;
	}
	var c = s.charAt(0);
	if (c === "e") {
		c = "E";
	}
	if ("0123456789".indexOf(c) !== -1 || ((c === "." || c === "E") && r.indexOf(c) === -1)) {
		return Fleur.XPathEvaluator._getNumber(s.substr(1), r + c);
	}
	return r;
};
Fleur.XPathEvaluator._xp2js = function(xp, args, ops) {
	var i = Fleur.XPathEvaluator._skipSpaces(xp, 0);
	var c = xp.charAt(i);
	var d = xp.substr(xp.indexOf(c) + 1);
	var n = "";
	var r = "";
	if (c === ".") {
		if (d.charAt(0) === ".") {
			//stepExpr
			r = "2.[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['parent']],[XQueryX.anyKindTest,[]]]]]]";
		} else {
			//contextItemExpr
			r = "1.[XQueryX.contextItemExpr,[]]";
		}
	} else if (c === ")") {
		r = "0.";
	} else if (c === "/") {
		//rootExpr
		r = "0.[XQueryX.pathExpr,[[XQueryX.rootExpr,[]]]]";
	} else if (c === "@") {
		r = getNameStep(d, 1);
	} else if (c === "'") {
		//stringConstantExpr
		var sep2 = d.indexOf("'");
		var t2 = d.substr(0, d.indexOf("'"));
		while (d.substr(sep2 + 1, 1) === "'") {
			var d2 = d.substr(sep2 + 2);
			t2 += "\\'" + d2.substr(0, d2.indexOf("'"));
			sep2 += 2 + d2.indexOf("'");
		}
		var t2b = "'" + Fleur.DocumentType.resolveEntities(null, t2) + "'";
		if (t2b === "''") {
			t2b = "";
		}
		r = (sep2 + 2) + ".[XQueryX.stringConstantExpr,[[XQueryX.value,[" + t2b + "]]]]";
	} else if (c === '"') {
		var sep3 = d.indexOf('"');
		var t3 = d.substr(0, d.indexOf('"'));
		while (d.substr(sep3 + 1, 1) === '"') {
			var d3 = d.substr(sep3 + 2);
			t3 += '\\"' + d3.substr(0, d3.indexOf('"'));
			sep3 += 2 + d3.indexOf('"');
		}
		var t3b = '"' + Fleur.DocumentType.resolveEntities(null, t3) + '"';
		if (t3b === '""') {
			t3b = "";
		}
		r = (sep3 + 2) + ".[XQueryX.stringConstantExpr,[[XQueryX.value,[" + t3b + "]]]]";
	} else if (c === "(") {
		if (d.charAt(Fleur.XPathEvaluator._skipSpaces(d, 0)) === ")") {
			r = "2.[XQueryX.sequenceExpr,[]]";
		} else {
			r = "0.";
		}
	} else if (c === "-" || c === "+") {
		if (d !== "" && "0123456789".indexOf(d.charAt(0)) !== -1) {
			var t4 = Fleur.XPathEvaluator._getNumber(d, c);
			r = t4.length + ".[" + (t4.indexOf("E") !== -1 ? "XQueryX.doubleConstantExpr" : t4.indexOf(".") !== -1 ? "XQueryX.decimalConstantExpr" : "XQueryX.integerConstantExpr") + ",[[XQueryX.value,['" + t4 + "']]]]";
		} else {
			c = "~" + c;
			r = "0.";
		}
	} else if (c !== "" && "0123456789".indexOf(c) !== -1) {
		var t5 = Fleur.XPathEvaluator._getNumber(c + d);
		r = t5.length + ".[" + (t5.indexOf("E") !== -1 ? "XQueryX.doubleConstantExpr" : t5.indexOf(".") !== -1 ? "XQueryX.decimalConstantExpr" : "XQueryX.integerConstantExpr") + ",[[XQueryX.value,['" + t5 + "']]]]";
	} else if (c === "$") {
		var t51 = Fleur.XPathEvaluator._getName(d);
		var pt51 = (t51.indexOf(":") === -1 ? ":" : "") + t51;
		r = (t51.length + 1) + ".[XQueryX.varRef,[[XQueryX.name,['" + pt51.substr(pt51.indexOf(":") + 1) + "'" + (pt51.charAt(0) === ":" ? "" : ",[XQueryX.prefix,['" + pt51.substr(0, pt51.indexOf(":")) + "']]") + "]]]]";
	} else if (c !== "" && "_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*".indexOf(c) !== -1) {
		r = Fleur.XPathEvaluator._getNameStep(c + d, 0);
	} else {
		r = "~~~~Unexpected char at '" + c + d + "'~#~#";
	}
	if (r.indexOf("~~~~") !== -1) {
		return r;
	}
	var rlen = parseInt(r.substr(0, r.indexOf(".")), 10);
	var rval = r.substr(r.indexOf(".") + 1);
	var d2 = rlen === 0 ? c + d : d.substr(rlen - 1);
	r = Fleur.XPathEvaluator._getPredParams(d2, rlen, rval);
	rlen = parseInt(r.substr(0, r.indexOf(".")), 10);
	rval = r.substr(r.indexOf(".") + 1);
	var args2 = rval.length + "." + rval + args;
	var f = rlen === 0 ? c + d : d.substr(rlen - 1);
	var i4 = Fleur.XPathEvaluator._skipSpaces(f, 0);
	var o = f.charAt(i4);
	if (ops.substr(0, 16) === "13.6.instance of") {
		if (o === "+" || o === "?" || o === "*") {
			ops = "14.6.instance of" + o + ops.substr(16);
			i4 = Fleur.XPathEvaluator._skipSpaces(f, 1);
			o = f.charAt(i4);
		}
	}
	if (o === "") {
		var stacks = Fleur.XPathEvaluator._calc(args2, ops, 9999999);
		var reslen0 = stacks.substr(stacks.indexOf(".") + 1);
		var reslen = reslen0.substr(0, reslen0.indexOf("."));
		var ret0 = stacks.substr(stacks.indexOf(".") + 1);
		return ret0.substr(ret0.indexOf(".") + 1).substr(0, parseInt(reslen, 10));
	}
	var p = f.substr(f.indexOf(o));
	if (o === "]" || o === ")" || (p.substr(0, 6) === "return" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(6)) === -1) || (p.substr(0, 9) === "satisfies" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(9)) === -1)) {
		var stacks2 = Fleur.XPathEvaluator._calc(args2, ops, 998);
		var reslen20 = stacks2.substr(stacks2.indexOf(".") + 1);
		var reslen2 = reslen20.substr(0, reslen20.indexOf("."));
		var ret20 = stacks2.substr(stacks2.indexOf(".") + 1);
		return (f.substr(f.indexOf(o) + 1).length - (o === "r" ? 5 : o === "s" ? 8 : 0)) + "." + ret20.substr(ret20.indexOf(".") + 1).substr(0, parseInt(reslen2, 10));
	}
	var op = "null";
	var op2 = "null";
	if (o === "$") {
		//alert(o);
		switch(rval) {
			case "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['child']],[XQueryX.nameTest,['for']]]]]]":
				rval = "[XQueryX.flworExpr,[[XQueryX.forClause,[]]]]";
				op = "for";
				break;
			case "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['child']],[XQueryX.nameTest,['let']]]]]]":
				rval = "[XQueryX.flworExpr,[[XQueryX.letClause,[]]]]";
				op = "let";
				break;
			case "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['child']],[XQueryX.nameTest,['every']]]]]]":
				rval = "[XQueryX.quantifiedExpr,[[XQueryX.quantifier,['every']]]]";
				op = "every";
				break;
			case "[XQueryX.pathExpr,[[XQueryX.stepExpr,[[XQueryX.xpathAxis,['child']],[XQueryX.nameTest,['some']]]]]]":
				rval = "[XQueryX.quantifiedExpr,[[XQueryX.quantifier,['some']]]]";
				op = "some";
				break;
		}
		if (op !== "null") {
			r = Fleur.XPathEvaluator._getPredParams("(" + f, rlen, rval);
			rlen = parseInt(r.substr(0, r.indexOf(".")), 10);
			rval = r.substr(r.indexOf(".") + 1);
			args2 = rval.length + "." + rval + args;
			op = op === "for" || op === "let" ? "return" : "satisfies";
			f = d.substr(rlen - 2 - op.length);
			p = f.substr(1);
		}
	} else if (p.substr(0, 9) === "intersect" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(9)) === -1) {
		op = p.substr(0, 9);
	} else if (p.substr(0, 8) === "instance" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(8)) === -1) {
		op = p.substr(0, Fleur.XPathEvaluator._skipSpaces(p, 8) + 2);
		op2 = "instance of";
	} else if (p.substr(0, 8) === "castable" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(8)) === -1) {
		op = p.substr(0, Fleur.XPathEvaluator._skipSpaces(p, 8) + 2);
		op2 = "castable as";
	} else if (p.substr(0, 6) === "except" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(6)) === -1) {
		op = p.substr(0, 6);
	} else if (p.substr(0, 5) === "treat" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(5)) === -1) {
		op = p.substr(0, Fleur.XPathEvaluator._skipSpaces(p, 5) + 2);
		op2 = "treat as";
	} else if ((p.substr(0, 5) === "union" || p.substr(0, 5) === "every") && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(5)) === -1) {
		op = p.substr(0, 5);
	} else if (p.substr(0, 4) === "cast" && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(4)) === -1) {
		op = p.substr(0, Fleur.XPathEvaluator._skipSpaces(p, 4) + 2);
		op2 = "cast as";
	} else if ((p.substr(0, 4) === "idiv" || p.substr(0, 4) === "some" || p.substr(0, 4) === "then" || p.substr(0, 4) === "else") && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(4)) === -1) {
		op = p.substr(0, 4);
	} else if ((p.substr(0, 3) === "div" || p.substr(0, 3) === "and" || p.substr(0, 3) === "mod") && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(3)) === -1) {
		op = p.substr(0, 3);
	} else if ((p.substr(0, 2) === "or" || p.substr(0, 2) === "eq" || p.substr(0, 2) === "ne" || p.substr(0, 2) === "lt" || p.substr(0, 2) === "le" || p.substr(0, 2) === "gt" || p.substr(0, 2) === "ge" || p.substr(0, 2) === "is" || p.substr(0, 2) === "to" || p.substr(0, 2) === "in") && "_.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:".indexOf(p.charAt(2)) === -1) {
		op = p.substr(0, 2);
	} else if (p.substr(0, 2) === "!=" || p.substr(0, 2) === "<=" || p.substr(0, 2) === ">=" || p.substr(0, 2) === "<<" || p.substr(0, 2) === ">>" || p.substr(0, 2) === "//" || p.substr(0, 2) === "~+" || p.substr(0, 2) === "~-" || p.substr(0, 2) === ":=") {
		op = p.substr(0, 2);
	} else if ("+-*=|,<>/!".indexOf(o) !== -1) {
		op = o;
	}
	if (op !== "null") {
		var opprec0 = Fleur.XPathEvaluator._precedence.substr(Fleur.XPathEvaluator._precedence.indexOf("." + (op2 !== "null" ? op2 : op) + ".") + op.length + 2);
		var opprec00 = opprec0.substr(opprec0.indexOf(";") + 1);
		var opprec = opprec00.substr(0, opprec00.indexOf("."));
		var stacks3 = Fleur.XPathEvaluator._calc(args2, ops, parseInt(opprec, 10));
		var args3len = stacks3.substr(0, stacks3.indexOf("."));
		var args3 = stacks3.substr(stacks3.indexOf(".") + 1).substr(0, parseInt(args3len, 10));
		var nextstack = stacks3.substr(args3len.length + 1 + parseInt(args3len, 10));
		var ops3len = nextstack.substr(0, nextstack.indexOf("."));
		var ops3 = nextstack.substr(nextstack.indexOf(".") + 1).substr(0, parseInt(ops3len, 10));
		var xp3 = p.substr(op.length);
		return Fleur.XPathEvaluator._xp2js(xp3, args3, (opprec.length + 1 + op.length) + "." + opprec + "." + op + ops3);
	}
	return "~~~~Unknown operator at '" + f + "'~#~#";
};
Fleur.XPathEvaluator.prototype.createExpression = function(expression, resolver) {
	expression = expression || "";
//	return '[XQueryX.module,[[XQueryX.mainModule,[[XQueryX.queryBody,[' + Fleur.XPathEvaluator._xp2js(expression, "", "") + ']]]],[XQueryX.xqx,"http://www.w3.org/2005/XQueryX"],[XQueryX.schemaLocation,"http://www.w3.org/2005/XQueryX http://www.w3.org/2005/XQueryX/xqueryx.xsd"],[XQueryX.xsi,"http://www.w3.org/2001/XMLSchema-instance"]]]';
	return '[XQueryX.module,[[XQueryX.mainModule,[[XQueryX.queryBody,[' + Fleur.XPathEvaluator._xp2js(expression, "", "") + ']]]],[XQueryX.xqx,"http://www.w3.org/2005/XQueryX"]]]';
};

Fleur.GrammarParser = function() {};
Fleur.GrammarParser._skipSpaces = function(s, offset) {
	var i = offset;
	var c = s.charAt(i);
	var pre = "";
	do {
		if (c !== "\n" && c !== "\r" && c !== "\t" && c !== " ") {
			return pre === "\n" ? i - 1 : i;
		}
		pre = c;
		c = s.charAt(++i);
	} while (c !== "");
	console.log("skip="+s.substring(offset, i).quote());
	return i;
};
Fleur.GrammarParser._getName = function(s) {
	var i = 0;
	var o = s.charAt(0);
	while (o !== "" && "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-".indexOf(o) !== -1) {
		o = s.charAt(++i);
	}
	return s.substr(0, i).toLowerCase();
};
Fleur.GrammarParser._getTerm = function(s) {
	var i = 0;
	var o = s.charAt(i);
	var prevo = "";
	var t = [];
	var typ = 0;
	var ref = 1;
	var reg;
	if (o === "(") {
	} else {
		if (o === "^") {
			ref = 0;
			o = s.charAt(++i);
		} else if (o === "@") {
			ref = 1;
			typ = 2;
			o = s.charAt(++i);
		}
		if (o === "[") {
			reg = "[";
			do {
				o = s.charAt(++i);
				if (o === ']') {
					if (prevo !== '\\') {
						reg += "]";
						t.push(ref ? [1, new RegExp(reg), 1] : [1, new RegExp(reg)]);
						prevo = "";
					}
				}
				reg += o;
			} while (o !== "");
		} else if (o === '"') {
			typ = 3;
			do {
				o = s.charAt(++i);
				if (o === '"') {
					if (prevo === '"') {
						t.push(ref ? [0, '"', 1] : [0, '"']);
						prevo = "";
					} else {
						break;
					}
				} else {
					t.push(ref ? [0, o, 1] : [0, o]);
					prevo = o;
				}
			} while (o !== "");
		} else {
			if (typ === 0) {
				typ = 1;
			}
			o = Fleur.GrammarParser._getName(s.substr(i));
			switch (o) {
				case "alpha":
					t.push(ref ? [1, /[A-Za-z]/, 1] : [1, /[A-Za-z]/]);
					break;
				case "bit":
					t.push(ref ? [1, /[01]/, 1] : [1, /[01]/]);
					break;
				case "char":
					t.push(ref ? [1, /[^\0]/, 1] : [1, /[^\0]/]);
					break;
				case "cr":
					t.push(ref ? [0, "\r", 1] : [0, "\r"]);
					break;
				case "ctl":
					t.push(ref ? [1, /[\0-\x1f\x7f]/, 1] : [1, /[\0-\x1f\x7f]/]);
					break;
				case "digit":
					t.push(ref ? [1, /[0-9]/, 1] : [1, /[0-9]/]);
					break;
				case "dquote":
					t.push(ref ? [0, '"', 1] : [0, '"']);
					break;
				case "hexdig":
					t.push(ref ? [1, /[0-9A-Fa-f]/, 1] : [1, /[0-9A-Fa-f]/]);
					break;
				case "htab":
					t.push(ref ? [0, "\t", 1] : [0, "\t"]);
					break;
				case "lf":
					t.push(ref ? [0, "\n", 1] : [0, "\n"]);
					break;
				case "octet":
					t.push(ref ? [1, /[\0-\xff]/, 1] : [1, /[\0-\xff]/]);
					break;
				case "sp":
					t.push(ref ? [0, " ", 1] : [0, " "]);
					break;
				case "vchar":
					t.push(ref ? [1, /[\x21-\x7e]/, 1] : [1, /[\x21-\x7e]/]);
					break;
				case "wsp":
					t.push(ref ? [1, /[ \t]/, 1] : [1, /[ \t]/]);
					break;
				default:
					t.push(ref ? [2, o, typ] : [2, o]);
			}
		}
	}
	return t;
};
Fleur.GrammarParser._getAlternative = function(s) {
	var offset = 0;
	var o = s.charAt(offset);
	var term = "";
	var alt = [];
	while (o !== "") {
		if (o === " ") {
			term = term.substr(Fleur.GrammarParser._skipSpaces(term, 0));
			console.log("term=" + term.quote());
			if (term !== "") {
				alt = alt.concat(Fleur.GrammarParser._getTerm(term));
			}
			term = "";
		} else {
			term += o;
		}
		o = s.charAt(++offset);
	}
	term = term.substr(Fleur.GrammarParser._skipSpaces(term, 0));
	console.log("term=" + term.quote());
	if (term !== "") {
		return alt.concat(Fleur.GrammarParser._getTerm(term));
	}
	return alt;
};
Fleur.GrammarParser._getDefinition = function(s) {
	var offset = 0;
	var o = s.charAt(offset);
	var alt = "";
	var def = [];
	var empty = true;
	while (o !== "") {
		if (o === "/") {
			alt = alt.substr(Fleur.GrammarParser._skipSpaces(alt, 0));
			console.log("alt=" + alt.quote());
			if (alt !== "") {
				def.push(Fleur.GrammarParser._getAlternative(alt));
				empty = false;
			}
			alt = "";
		} else {
			alt += o;
		}
		o = s.charAt(++offset);
	}
	alt = alt.substr(Fleur.GrammarParser._skipSpaces(alt, 0));
	console.log("alt=" + alt.quote());
	if (alt !== "") {
		def.push(Fleur.GrammarParser._getAlternative(alt));
	} else if (empty) {
		def.push([]);
	}
	return def;
};
Fleur.GrammarParser.prototype.createGrammar = function(grammar) {
	var g = [];
	var offset = 0;
	var end = grammar.length;
	var n = [[""], [[2, 0, "xmlns"]]];
	var rules = {};
	var nbrules = 0;
	var rulename;
	var o;
	var def;
	var i, j, k, l, l2, l3;
	var prods = {};
	var nbprods = 1;
	var root = "";
	var ruleindex;
	while (offset < end) {
		offset = Fleur.GrammarParser._skipSpaces(grammar, offset);
		rulename = Fleur.GrammarParser._getName(grammar.substr(offset));
		console.log("rulename=" + rulename.quote());
		if (rulename != "") {
			if (root === "") {
				root = rulename;
			}
			offset += rulename.length;
			offset = Fleur.GrammarParser._skipSpaces(grammar, offset);
			offset++;
			if (grammar.charAt(offset) === "/") {
				ruleindex = rules[rulename];
				offset++;
			} else {
				rules[rulename] = nbrules++;
				ruleindex = g.length;
			}
			offset = Fleur.GrammarParser._skipSpaces(grammar, offset);
			o = grammar.charAt(offset);
			def = "";
			var pre = ""
			var instr = false;
			var incomment = false;
			while (o !== ""){
				if (pre === "\n") {
					if (o !== " ") {
						def = def.substr(0, def.length - 1);
						offset--;
						break;
					} else {
						def = def.substr(0, def.length - 1);
					}
				}
				if (instr) {
					instr = o !== '"';
				}
				if (incomment) {
					incomment = o !== "\n";
				} else if (o === ";" && !instr) {
					incomment = true;
				} else {
					def += o;
					instr = o === '"' && !incomment;
				}
				pre = o;
				o = grammar.charAt(++offset);
			}
			offset++;
			console.log("def=" + def.quote());
			if (ruleindex === g.length) {
				g.push(Fleur.GrammarParser._getDefinition(def));
			} else {
				g[ruleindex] = g[ruleindex].concat(Fleur.GrammarParser._getDefinition(def));
			}
		} else {
			offset++;
		}
	}
	prods["1 " + root] = 0;
	n[1][1] = [1, 0, root];
	for (i = 0, l = g.length; i < l; i++) {
		for (j = 0, l2 = g[i].length; j < l2; j++) {
			for (k = 0, l3 = g[i][j].length; k < l3; k++) {
				if (g[i][j][k][0] === 2) {
					if (g[i][j][k][2]) {
						if (prods[g[i][j][k][2] + " " + g[i][j][k][1]]) {
							g[i][j][k][2] = prods[g[i][j][k][2] + " " + g[i][j][k][1]];
						} else {
							prods[g[i][j][k][2] + " " + g[i][j][k][1]] = ++nbprods;
							n[1].push([g[i][j][k][2], 0, g[i][j][k][1]]);
							g[i][j][k][2] = nbprods;
						}
					}
					g[i][j][k][1] = rules[g[i][j][k][1]];
				}
			}
		}
	}
	return [g, n];
};

})(typeof exports === 'undefined'? this.Fleur = {}: exports);