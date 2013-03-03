var Fleur = {};

Fleur.TypeInfo = function() {};
Fleur.TypeInfo.DERIVATION_RESTRICTION = 1;
Fleur.TypeInfo.DERIVATION_EXTENSION = 2;
Fleur.TypeInfo.DERIVATION_UNION = 4;
Fleur.TypeInfo.DERIVATION_LIST = 8;
Fleur.TypeInfo.prototype.isDerivedFrom = function(typeNamespaceArg, typeNameArg, derivationMethod) {
};

Fleur.UserDataHandler = function() {};
Fleur.UserDataHandler.NODE_CLONED = 1;
Fleur.UserDataHandler.NODE_IMPORTED = 2;
Fleur.UserDataHandler.NODE_DELETED = 3;
Fleur.UserDataHandler.NODE_RENAMED = 4;
Fleur.UserDataHandler.NODE_ADOPTED = 5;
Fleur.UserDataHandler.prototype.handle = function(operation, key, data, src, dst) {
};

Fleur.DOMError = function() {};
Fleur.DOMError.SEVERITY_WARNING = 1;
Fleur.DOMError.SEVERITY_ERROR = 2;
Fleur.DOMError.SEVERITY_FATAL_ERROR = 3;

Fleur.DOMErrorHandler = function() {};
Fleur.DOMErrorHandler.prototype.handleError = function(error) {
};

Fleur.DOMLocator = function() {};

Fleur.DOMConfiguration = function() {};
Fleur.DOMConfiguration.prototype.setParameter = function(name, value) {
};
Fleur.DOMConfiguration.prototype.getParameter = function(name) {
};
Fleur.DOMConfiguration.prototype.canSetParameter = function(name, value) {
};

Fleur.Node = function() {};
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
Fleur.Node.prototype.insertBefore = function(newChild, refChild) {
};
Fleur.Node.prototype.replaceChild = function(newChild, oldChild) {
};
Fleur.Node.prototype.removeChild = function(oldChild) {
};
Fleur.Node.prototype.appendChild = function(newChild) {
};
Fleur.Node.prototype.hasChildNodes = function() {
};
Fleur.Node.prototype.cloneNode = function(deep) {
};
Fleur.Node.prototype.normalize = function() {
};
Fleur.Node.prototype.isSupported = function(feature, version) {
};
Fleur.Node.prototype.hasAttributes = function() {
};
Fleur.Node.prototype.compareDocumentPosition = function(other) {
};
Fleur.Node.prototype.isSameNode = function(other) {
};
Fleur.Node.prototype.lookupPrefix = function(namespaceURI) {
};
Fleur.Node.prototype.isDefaultNamespace = function(namespaceURI) {
};
Fleur.Node.prototype.lookupNamespaceURI = function(prefix) {
};
Fleur.Node.prototype.isEqualNode = function(arg) {
};
Fleur.Node.prototype.getFeature = function(feature, version) {
};
Fleur.Node.prototype.setUserData = function(key, data, handler) {
};
Fleur.Node.prototype.getUserData = function(key) {
};

Fleur.Element = function() {
	this.nodeType = Fleur.Node.ELEMENT_NODE;
};
Fleur.Element.prototype = new Fleur.Node();
Fleur.Element.prototype.getAttribute = function(name) {
};
Fleur.Element.prototype.setAttribute = function(name, value) {
};
Fleur.Element.prototype.removeAttribute = function(name) {
};
Fleur.Element.prototype.getAttributeNode = function(name) {
};
Fleur.Element.prototype.setAttributeNode = function(newAttr) {
};
Fleur.Element.prototype.removeAttributeNode = function(oldAttr) {
};
Fleur.Element.prototype.getElementsByTagName = function(name) {
};
Fleur.Element.prototype.getAttributeNS = function(namespaceURI, localName) {
};
Fleur.Element.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
};
Fleur.Element.prototype.removeAttributeNS = function(namespaceURI, localName) {
};
Fleur.Element.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
};
Fleur.Element.prototype.setAttributeNodeNS = function(newAttr) {
};
Fleur.Element.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
};
Fleur.Element.prototype.hasAttribute = function(name) {
};
Fleur.Element.prototype.hasAttributeNS = function(name) {
};
Fleur.Element.prototype.setIdAttribute = function(name, isId) {
};
Fleur.Element.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
};
Fleur.Element.prototype.setIdAttributeNode = function(idAttr, isId) {
};

Fleur.Attr = function() {
	this.nodeType = Fleur.Node.ATTRIBUTE_NODE;
};
Fleur.Attr.prototype = new Fleur.Node();

Fleur.CharacterData = function() {
	this.data = "";
	this.length = 0;
};
Fleur.CharacterData.prototype = new Fleur.Node();
Fleur.CharacterData.prototype.substringData = function(offset, count) {
};
Fleur.CharacterData.prototype.appendData = function(arg) {
};
Fleur.CharacterData.prototype.insertData = function(offset, data) {
};
Fleur.CharacterData.prototype.deleteData = function(offset, count) {
};
Fleur.CharacterData.prototype.replaceData = function(offset, count, arg) {
};

Fleur.Text = function() {
	this.nodeType = Fleur.Node.TEXT_NODE;
};
Fleur.Text.prototype = new Fleur.CharacterData();
Fleur.Text.prototype.splitText = function(offset) {
};
Fleur.Text.prototype.replaceWholeText = function(content) {
};

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
Fleur.Document.prototype.createElement = function(tagName) {
};
Fleur.Document.prototype.createDocumentFragment = function() {
};
Fleur.Document.prototype.createTextNode = function(data) {
};
Fleur.Document.prototype.createComment = function(data) {
};
Fleur.Document.prototype.createCDATASection = function(data) {
};
Fleur.Document.prototype.createProcessingInstruction = function(target, data) {
};
Fleur.Document.prototype.createAttribute = function(name) {
};
Fleur.Document.prototype.createEntityReference = function(name) {
};
Fleur.Document.prototype.getElementsByTagName = function(tagName) {
};
Fleur.Document.prototype.importNode = function(importedNode, deep) {
};
Fleur.Document.prototype.createElementNS = function(namespaceURI, qualifiedName) {
};
Fleur.Document.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
};
Fleur.Document.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
};
Fleur.Document.prototype.getElementById = function(elementId) {
};
Fleur.Document.prototype.adoptNode = function(source) {
};
Fleur.Document.prototype.normalizeDocument = function() {
};
Fleur.Document.prototype.renameNode = function(n, namespaceURI, qualifiedName) {
};

Fleur.DocumentType = function() {
	this.nodeType = Fleur.Node.DOCUMENT_TYPE_NODE;
};
Fleur.DocumentType.prototype = new Fleur.Node();

Fleur.DocumentFragment = function() {
	this.nodeType = Fleur.Node.DOCUMENT_FRAGMENT_NODE;
};
Fleur.DocumentFragment.prototype = new Fleur.Node();

Fleur.NamedNodeMap = function() {
	this.length = 0;
};
Fleur.NamedNodeMap.prototype.getNamedItem = function(name) {
};
Fleur.NamedNodeMap.prototype.setNamedItem = function(arg) {
};
Fleur.NamedNodeMap.prototype.removeNamedItem = function(name) {
};
Fleur.NamedNodeMap.prototype.item = function(index) {
};
Fleur.NamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
};
Fleur.NamedNodeMap.prototype.setNamedItemNS = function(arg) {
};
Fleur.NamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
};

Fleur.Nodes = function() {};

Fleur.NodeList = function() {
	this.length = 0;
};
Fleur.NodeList.prototype.item = function(index) {
};

Fleur.DOMParser = function() {};
Fleur.DOMParser.prototype.parseFromString = function(s, mediatype) {
};
