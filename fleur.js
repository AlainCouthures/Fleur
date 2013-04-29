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

Fleur.DOMException = function() {
	this.code = 0;
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
	this.parametersNames = new DOMStringList();
	for (p in this._parameters) {
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
	var f, l0 = Fleur._DOMImplementations.length, l1, i = 0, j = 0, version = new RegExp("^[0-9]*\.[0-9]*$", "g");
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
		while (j < l1 && Fleur._DOMImplementations.item(j).hasFeature(f[j], f[j + 1])) {
			j += 2;
		}
		if (j >= l1) {
			return Fleur._DOMImplementations.item(j);
		}
		i++;
	}
};
Fleur.DOMImplementationSource.prototype.getDOMImplementationList = function(features) {
	var f, l0 = Fleur._DOMImplementations.length, l1, i = 0, j = 0, version = new RegExp("^[0-9]*\.[0-9]*$", "g"), list = new Fleur.DOMImplementationList();
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
		while (j < l1 && Fleur._DOMImplementations.item(j).hasFeature(f[j], f[j + 1])) {
			j += 2;
		}
		if (j >= l1) {
			list.push(Fleur._DOMImplementations.item(j));
		}
		i++;
	}
	return list;
};

Fleur.DOMImplementation = function() {};
Fleur.DOMImplementation.prototype._Features = [
	["core", "3.0"],
	["core", "2.0"],
	["xml", "3.0"],
	["xml", "2.0"]
];
Fleur.DOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
	var doc = new Fleur.Document();
	doc.implementation = this;
	if (qualifiedName !== null) {
		doc.documentElement = doc.appendChild(doc.createElementNS(namespaceURI, qualifiedName));
	}
	doc.doctype = doctype;
	return doc;
};
Fleur.DOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
	var dt = new Fleur.DocumentType();
	dt.name = qualifiedName;
	dt.entities = new Fleur.NamedNodeMap();
	dt.notations = new Fleur.NamedNodeMap();
	dt.publicId = publicId;
	dt.systemId = systemId;
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

Fleur.NodeList = function() {};
Fleur.NodeList.prototype = new Array();
Fleur.NodeList.prototype.item = function(index) {
	return this[index];
};

Fleur.NamedNodeMap = function() {
	this.length = 0;
	this._map = {
		" ": {}
	};
};
Fleur.NamedNodeMap.prototype.getNamedItem = function(name) {
	return this._map[" "].[name];
};
Fleur.NamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
	return this._map[namespaceURI] ? this._map[namespaceURI].[localName] : null;
};
Fleur.NamedNodeMap.prototype.item = function(index) {
	var ns, n;
	if (typeof index !== "number" || index < 0) {
		return null;
	}
	for (ns in this._map) {
		if (this._map.hasOwnProperty(ns)) {
			for (n in this._map[ns]) {
				if (this._map[ns].hasOwnProperty(n)) {
					if (index === 0) {
						return this._map[ns].[n];
					}
					index--;
				}
			}
		}
	}
	return null;
};
Fleur.NamedNodeMap.prototype.removeNamedItem = function(name) {
	var node = this._map[" "].[name];
	if (!node) {
		throw Fleur.DOMException.NOT_FOUND_ERR;
	}
	delete this._map[" "].[name];
	return node;
};
Fleur.NamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
	var node = this._map[namespaceURI] ? this._map[namespaceURI].[localName] : null;
	if (!node) {
		throw Fleur.DOMException.NOT_FOUND_ERR;
	}
	delete this._map[namespaceURI].[localName];
	return node;
};
Fleur.NamedNodeMap.prototype.setNamedItem = function(arg) {
	return this._map[" "].[arg.localName] = arg;
};
Fleur.NamedNodeMap.prototype.setNamedItemNS = function(arg) {
	return arg.namespaceURI ? (this._map[arg.namespaceURI].[arg.localName] = arg) : (this._map[" "].[arg.localName] = arg);
};

Fleur.Node = function() {
	this._userData = {};
	this.childNodes = new Fleur.NodeList();
	this.attributes = new Fleur.NamedNodeMap();
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
Fleur.Node.DOCUMENT_POSITION_DISCONNECTED = 1;
Fleur.Node.DOCUMENT_POSITION_PRECEDING = 2;
Fleur.Node.DOCUMENT_POSITION_FOLLOWING = 4;
Fleur.Node.DOCUMENT_POSITION_CONTAINS = 8;
Fleur.Node.DOCUMENT_POSITION_CONTAINED_BY = 16;
Fleur.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
Fleur.Node.prototype.appendChild = function(newChild) {
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
};
Fleur.Node.prototype.cloneNode = function(deep) {
	var i = 0, li = 0, j = 0, lj = 0, clone = null;
	switch (this.nodeType) {
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
	var nancestors = new Array();
	var oancestor = other.ownerElement || other.parentNode;
	var oancestors = new Array();
	var i = 0, j = 0;
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
	return this.attributes && this.attributes.length !== 0;
};
Fleur.Node.prototype.hasChildNodes = function() {
	return this.childNodes && this.childNodes.length !== 0;
};
Fleur.Node.prototype.insertBefore = function(newChild, refChild) {
	var i = 0, l = this.childNodes.length;
	if (refChild === newChild) {
		return;
	}
	while (i < l) {
		if (this.childNodes[i] === refChild) {
			if (newChild.parentNode) {
				newChild.parentNode.removeChild(newChild);
			}
			newChild.parentNode = this;
			newChild.previousSibling = refChild.previousSibling;
			refChild.previousSibling = newChild;
			if (newNode.previousSibling) {
				newNode.previousSibling.nextSibling = newChild;
			} else {
				this.firstChild = newChild;
			}
			newChild.nextSibling = refChild;
			this.childNodes.splice(i, 0, newChild);
			return;
		}
		i++;
	}
};
/*
Fleur.Node.prototype.isDefaultNamespace = function(namespaceURI) {
};
*/
Fleur.Node.prototype.isEqualNode = function(arg) {
	return arg === this;
};
/*
Fleur.Node.prototype.isSameNode = function(other) {
};
*/
/*
Fleur.Node.prototype.isSupported = function(feature, version) {
};
*/
/*
Fleur.Node.prototype.lookupNamespaceURI = function(prefix) {
};
*/
/*
Fleur.Node.prototype.lookupPrefix = function(namespaceURI) {
};
*/
/*
Fleur.Node.prototype.normalize = function() {
};
*/
Fleur.Node.prototype.removeChild = function(oldChild) {
	var i = 0, l = this.childNodes.length;
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
			return;
        }
		i++;
    }
};
Fleur.Node.prototype.replaceChild = function(newChild, oldChild) {
	var i = 0, l = this.childNodes.length;
	if (oldChild === newChild) {
		return;
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
			return;
		}
		i++;
	}
};
Fleur.Node.prototype.setUserData = function(key, data, handler) {
	this._userData[key] = data;
};

Fleur.Element = function() {
	this.nodeType = Fleur.Node.ELEMENT_NODE;
};
Fleur.Element.prototype = new Fleur.Node();
Fleur.Element.prototype.getAttribute = function(name) {
	return this.getAttributeNS(null, name);
};
Fleur.Element.prototype.getAttributeNode = function(name) {
	return this.getAttributeNodeNS(null, name);
};
Fleur.Element.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
	var i = 0, l = this.attributes.length;
	while (i < l) {
		if (this.attributes[i].nodeName === localName && (!namespaceURI || this.attributes[i].namespaceURI === namespaceURI)) {
			return this.attributes[i];
		}
		i++;
	}
	return null;
};
Fleur.Element.prototype.getAttributeNS = function(namespaceURI, localName) {
	var i = 0, l = this.attributes.length;
	while (i < l) {
		if (this.attributes[i].nodeName === localName && (!namespaceURI || this.attributes[i].namespaceURI === namespaceURI)) {
			return this.attributes[i].nodeValue;
		}
		i++;
	}
	return null;
};
Fleur.Element.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
	var i = 0, l = this.childNodes.length, elts = this.namespaceURI === namespaceURI && this.localName === localName ? [this] : [];
	while (i < l) {
		elts = elts.concat(this.childNodes[i++].getElementsByTagNameNS(namespaceURI, localName));
	}
	return elts;
};
Fleur.Element.prototype.getElementsByTagName = function(name) {
	var i = 0, l = this.childNodes.length, elts = this.nodeName === name ? [this] : [];
	while (i < l) {
		elts = elts.concat(this.childNodes[i++].getElementsByTagName(name));
	}
	return elts;
};
Fleur.Element.prototype.hasAttribute = function(name) {
	return this.attributes.getNamedItem(name) !== null;
};
Fleur.Element.prototype.hasAttributeNS = function(namespaceURI, localName) {
	return this.attributes.getNamedItemNS(namespaceURI, localName) !== null;
};
Fleur.Element.prototype.removeAttribute = function(name) {
	this.attributes.removeNamedItem(name);
};
Fleur.Element.prototype.removeAttributeNode = function(oldAttr) {
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
	attr.parentNode = attr.ownerElement = this;
	attr.nodeValue = value;
	this.attributes.setNamedItem(attr);
};
Fleur.Element.prototype.setAttributeNode = function(newAttr) {
	newAttr.parentNode = newAttr.ownerElement = this;
	this.attributes.setNamedItem(newAttr);
};
Fleur.Element.prototype.setAttributeNodeNS = function(newAttr) {
	newAttr.parentNode = newAttr.ownerElement = this;
	this.attributes.setNamedItemNS(newAttr);
};
Fleur.Element.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
	var attr;
	if (this.hasAttributeNS(namespaceURI, qualifiedName)) {
		attr = this.attributes.getNamedItemNS(namespaceURI, qualifiedName);
		attr.nodeValue = value;
		return;
	}
	attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
	attr.parentNode = attr.ownerElement = this;
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
	this.nodeType = Fleur.Node.ATTRIBUTE_NODE;
};
Fleur.Attr.prototype = new Fleur.Node();

Fleur.CharacterData = function() {
	this.data = "";
	this.length = 0;
};
Fleur.CharacterData.prototype = new Fleur.Node();
Fleur.CharacterData.prototype.appendData = function(arg) {
	this.nodeValue = this.data += arg;
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.deleteData = function(offset, count) {
	this.nodeValue = this.data = this.data.substr(0, offset) + this.data.substr(offset + count);
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.insertData = function(offset, data) {
	this.nodeValue = this.data = this.data.substr(0, offset) + data + this.data.substr(offset);
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.replaceData = function(offset, count, arg) {
	this.nodeValue = this.data = this.data.substr(0, offset) + arg + this.data.substr(offset + count);
	this.length = this.data.length;
};
Fleur.CharacterData.prototype.substringData = function(offset, count) {
	return this.data.substr(offset, count);
};

Fleur.Text = function() {
	this.nodeType = Fleur.Node.TEXT_NODE;
};
Fleur.Text.prototype = new Fleur.CharacterData();
/*
Fleur.Text.prototype.replaceWholeText = function(content) {
};
*/
/*
Fleur.Text.prototype.splitText = function(offset) {
};
*/

Fleur.CDATASection = function() {
	this.nodeType = Fleur.Node.CDATA_NODE;
};
Fleur.CDATASection.prototype = new Fleur.CharacterData();

Fleur.EntityReference = function() {
	this.nodeType = Fleur.Node.ENTITY_REFERENCE_NODE;
};
Fleur.EntityReference.prototype = new Fleur.Node();

Fleur.Entity = function() {
	this.nodeType = Fleur.Node.ENTITY_NODE;
};
Fleur.Entity.prototype = new Fleur.Node();

Fleur.ProcessingInstruction = function() {
	this.nodeType = Fleur.Node.PROCESSING_INSTRUCTION_NODE;
};
Fleur.ProcessingInstruction.prototype = new Fleur.Node();

Fleur.Comment = function() {
	this.nodeType = Fleur.Node.COMMENT_NODE;
};
Fleur.Comment.prototype = new Fleur.CharacterData();

Fleur.Document = function() {
	this.nodeType = Fleur.Node.DOCUMENT_NODE;
};
Fleur.Document.prototype = new Fleur.Node();
/*
Fleur.Document.prototype.adoptNode = function(source) {
};
*/
Fleur.Document.prototype.createAttribute = function(name) {
	return this.createAttributeNS(null, name);
};
Fleur.Document.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
	var node = new Fleur.Attribute();
	node._setOwnerDocument(this);
	node._setNodeNameLocalNamePrefix(namespaceURI, qualifiedName);
	node.name = qualifiedName;
	node.textContent = node.nodeValue = "";
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
};
Fleur.Document.prototype.createElement = function(tagName) {
	return this.createElementNS(null, tagName);
};
Fleur.Document.prototype.createElementNS = function(namespaceURI, qualifiedName) {
	var node = new Fleur.Element();
	node._setOwnerDocument(this);
	node._setNodeNameLocalNamePrefix(namespaceURI, qualifiedName);
	node.name = qualifiedName;
	node.childNodes = new Fleur.NodeList();
	node.attributes = new Fleur.NamedNodeMap();
	node.textContent = node.nodeValue = "";
	return node;
};
/*
Fleur.Document.prototype.createEntityReference = function(name) {
};
*/
Fleur.Document.prototype.createProcessingInstruction = function(target, data) {
	var node = new Fleur.ProcessingInstruction();
	node._setOwnerDocument(this);
	node.target = target;
	node.data = data;
};
Fleur.Document.prototype.createTextNode = function(data) {
	var node = new Fleur.Text();
	node._setOwnerDocument(this);
	node.textContent = node.nodeValue = data;
};
/*
Fleur.Document.prototype.getElementById = function(elementId) {
};
*/
/*
Fleur.Document.prototype.getElementsByTagName = function(tagName) {
};
*/
/*
Fleur.Document.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
};
*/
/*
Fleur.Document.prototype.importNode = function(importedNode, deep) {
};
*/
/*
Fleur.Document.prototype.normalizeDocument = function() {
};
*/
/*
Fleur.Document.prototype.renameNode = function(n, namespaceURI, qualifiedName) {
};
*/

Fleur.DocumentType = function() {
	this.nodeType = Fleur.Node.DOCUMENT_TYPE_NODE;
};
Fleur.DocumentType.prototype = new Fleur.Node();

Fleur.DocumentFragment = function() {
	this.nodeType = Fleur.Node.DOCUMENT_FRAGMENT_NODE;
};
Fleur.DocumentFragment.prototype = new Fleur.Node();

Fleur.Nodes = function() {};

Fleur.DOMParser = function() {};
/*
Fleur.DOMParser.prototype.parseFromString = function(s, mediatype) {
};
*/

}());