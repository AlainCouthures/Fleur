<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Copyright &#xA9; 2001-2005 World Wide Web Consortium,
(Massachusetts Institute of Technology, European Research Consortium 
for Informatics and Mathematics, Keio University). All 
Rights Reserved. This work is distributed under the W3C&#xAE; Software License [1] in the 
hope that it will be useful, but WITHOUT ANY WARRANTY; without even 
the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 

[1] http://www.w3.org/Consortium/Legal/2002/copyright-software-20021231
-->
<!--   
This transform generates ECMAScript source code from a language independent
test representation.

This transform requires an auxiliary file "interfaces.xml" that 
is produced by applying "extract.xsl" to the appropriate DOM
specificiation.


Usage:

saxon -o someTest.js someTest.xml test-to-ecmascript.xsl


-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="">
	<xsl:param name="interfaces-docname">dom3-interfaces_short.xml</xsl:param>
	<xsl:param name="target-uri-base"/>
	<xsl:param name="path"/>
	<xsl:param name="engine"/>
	<xsl:output method="xml" encoding="UTF-8" omit-xml-declaration="yes"/>
	<xsl:variable name="tabs" select="'&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;'"/>
	<xsl:variable name="domspec1">
		<library>
			<exception name="DOMException" id="ID-17189187">
				<component id="ID-146F692A" name="code">
					<typename>unsigned short</typename>
				</component>
			</exception>
			<group id="ID-258A00AF" name="ExceptionCode">
				<constant id="DOMException-INDEX_SIZE_ERR" name="INDEX_SIZE_ERR" type="unsigned short" value="1"/>
				<constant id="DOMException-DOMSTRING_SIZE_ERR" name="DOMSTRING_SIZE_ERR" type="unsigned short" value="2"/>
				<constant id="DOMException-HIERARCHY_REQUEST_ERR" name="HIERARCHY_REQUEST_ERR" type="unsigned short" value="3"/>
				<constant id="DOMException-WRONG_DOCUMENT_ERR" name="WRONG_DOCUMENT_ERR" type="unsigned short" value="4"/>
				<constant id="DOMException-INVALID_CHARACTER_ERR" name="INVALID_CHARACTER_ERR" type="unsigned short" value="5"/>
				<constant id="DOMException-NO_DATA_ALLOWED_ERR" name="NO_DATA_ALLOWED_ERR" type="unsigned short" value="6"/>
				<constant id="DOMException-NO_MODIFICATION_ALLOWED_ERR" name="NO_MODIFICATION_ALLOWED_ERR" type="unsigned short" value="7"/>
				<constant id="DOMException-NOT_FOUND_ERR" name="NOT_FOUND_ERR" type="unsigned short" value="8"/>
				<constant id="DOMException-NOT_SUPPORTED_ERR" name="NOT_SUPPORTED_ERR" type="unsigned short" value="9"/>
				<constant id="DOMException-INUSE_ATTRIBUTE_ERR" name="INUSE_ATTRIBUTE_ERR" type="unsigned short" value="10"/>
				<constant id="DOMException-INVALID_STATE_ERR" name="INVALID_STATE_ERR" type="unsigned short" value="11" since="DOM Level 2"/>
				<constant id="DOMException-SYNTAX_ERR" name="SYNTAX_ERR" type="unsigned short" value="12" since="DOM Level 2"/>
				<constant id="DOMException-INVALID_MODIFICATION_ERR" name="INVALID_MODIFICATION_ERR" type="unsigned short" value="13" since="DOM Level 2"/>
				<constant id="DOMException-NAMESPACE_ERR" name="NAMESPACE_ERR" type="unsigned short" value="14" since="DOM Level 2"/>
				<constant id="DOMException-INVALID_ACCESS_ERR" name="INVALID_ACCESS_ERR" type="unsigned short" value="15" since="DOM Level 2"/>
				<constant id="DOMException-VALIDATION_ERR" name="VALIDATION_ERR" type="unsigned short" value="16" since="DOM Level 3"/>
				<constant id="DOMException-TYPE_MISMATCH_ERR" name="TYPE_MISMATCH_ERR" type="unsigned short" value="17" since="DOM Level 3"/>
			</group>
			<interface name="DOMStringList" id="DOMStringList" since="DOM Level 3">
				<method name="item" id="DOMStringList-item">
					<parameters>
						<param name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
				<attribute type="unsigned long" readonly="yes" name="length" id="DOMStringList-length"/>
				<method name="contains" id="DOMStringList-contains">
					<parameters>
						<param name="str" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface name="NameList" id="NameList" since="DOM Level 3">
				<method name="getName" id="NameList-getName">
					<parameters>
						<param name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
				<method name="getNamespaceURI" id="NameList-getNamespaceURI">
					<parameters>
						<param name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
				<attribute type="unsigned long" readonly="yes" name="length" id="NameList-length"/>
				<method name="contains" id="NameList-contains">
					<parameters>
						<param name="str" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="containsNS" id="NameList-containsNS">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface name="DOMImplementationList" id="DOMImplementationList" since="DOM Level 3">
				<method name="item" id="DOMImplementationList-item">
					<parameters>
						<param name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="DOMImplementation"/>
					<raises/>
				</method>
				<attribute type="unsigned long" readonly="yes" name="length" id="DOMImplementationList-length"/>
			</interface>
			<interface name="DOMImplementationSource" id="DOMImplementationSource" since="DOM Level 3">
				<method name="getDOMImplementation" id="ID-getDOMImpl">
					<parameters>
						<param name="features" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMImplementation"/>
					<raises/>
				</method>
				<method name="getDOMImplementationList" id="ID-getDOMImpls">
					<parameters>
						<param name="features" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMImplementationList"/>
					<raises/>
				</method>
			</interface>
			<interface name="DOMImplementation" id="ID-102161490">
				<method name="hasFeature" id="ID-5CED94D7">
					<parameters>
						<param name="feature" type="DOMString" attr="in"/>
						<param name="version" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="createDocumentType" id="Level-2-Core-DOM-createDocType" since="DOM Level 2">
					<parameters>
						<param name="qualifiedName" type="DOMString" attr="in"/>
						<param name="publicId" type="DOMString" attr="in"/>
						<param name="systemId" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DocumentType"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createDocument" id="Level-2-Core-DOM-createDocument" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="qualifiedName" type="DOMString" attr="in"/>
						<param name="doctype" type="DocumentType" attr="in"/>
					</parameters>
					<returns type="Document"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getFeature" id="DOMImplementation3-getFeature" since="DOM Level 3">
					<parameters>
						<param name="feature" type="DOMString" attr="in"/>
						<param name="version" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMObject"/>
					<raises/>
				</method>
			</interface>
			<interface name="DocumentFragment" inherits="Node" id="ID-B63ED1A3"/>
			<interface name="Document" inherits="Node" id="i-Document">
				<attribute id="ID-B63ED1A31" name="doctype" type="DocumentType" readonly="yes" version="DOM Level 3"/>
				<attribute readonly="yes" name="implementation" type="DOMImplementation" id="ID-1B793EBA"/>
				<attribute readonly="yes" name="documentElement" type="Element" id="ID-87CD092"/>
				<method name="createElement" id="ID-2141741547">
					<parameters>
						<param name="tagName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Element"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createDocumentFragment" id="ID-35CB04B5">
					<parameters/>
					<returns type="DocumentFragment"/>
					<raises/>
				</method>
				<method name="createTextNode" id="ID-1975348127">
					<parameters>
						<param name="data" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Text"/>
					<raises/>
				</method>
				<method name="createComment" id="ID-1334481328">
					<parameters>
						<param name="data" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Comment"/>
					<raises/>
				</method>
				<method name="createCDATASection" id="ID-D26C0AF8">
					<parameters>
						<param name="data" type="DOMString" attr="in"/>
					</parameters>
					<returns type="CDATASection"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createProcessingInstruction" id="ID-135944439">
					<parameters>
						<param name="target" type="DOMString" attr="in"/>
						<param name="data" type="DOMString" attr="in"/>
					</parameters>
					<returns type="ProcessingInstruction"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createAttribute" id="ID-1084891198">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createEntityReference" id="ID-392B75AE">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="EntityReference"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getElementsByTagName" id="ID-A6C9094">
					<parameters>
						<param name="tagname" type="DOMString" attr="in"/>
					</parameters>
					<returns type="NodeList"/>
					<raises/>
				</method>
				<method name="importNode" id="Core-Document-importNode" since="DOM Level 2">
					<parameters>
						<param name="importedNode" type="Node" attr="in"/>
						<param name="deep" type="boolean" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException" version="DOM Level 3"/>
					</raises>
				</method>
				<method name="createElementNS" id="ID-DocCrElNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="qualifiedName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Element"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createAttributeNS" id="ID-DocCrAttrNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="qualifiedName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getElementsByTagNameNS" id="ID-getElBTNNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="NodeList"/>
					<raises/>
				</method>
				<method name="getElementById" id="ID-getElBId" since="DOM Level 2">
					<parameters>
						<param name="elementId" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Element"/>
					<raises/>
				</method>
				<attribute readonly="yes" type="DOMString" name="inputEncoding" id="Document3-inputEncoding" since="DOM Level 3"/>
				<attribute readonly="yes" type="DOMString" name="xmlEncoding" id="Document3-encoding" since="DOM Level 3"/>
				<attribute readonly="no" type="boolean" name="xmlStandalone" id="Document3-standalone" since="DOM Level 3">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
				<attribute readonly="no" type="DOMString" name="xmlVersion" id="Document3-version" since="DOM Level 3">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
				<attribute readonly="no" type="boolean" name="strictErrorChecking" id="Document3-strictErrorChecking" since="DOM Level 3"/>
				<attribute name="documentURI" id="Document3-documentURI" type="DOMString" readonly="no" since="DOM Level 3"/>
				<method name="adoptNode" id="Document3-adoptNode" since="DOM Level 3">
					<parameters>
						<param attr="in" type="Node" name="source"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<attribute readonly="yes" type="DOMConfiguration" name="domConfig" id="Document3-domConfig" since="DOM Level 3"/>
				<method name="normalizeDocument" id="Document3-normalizeDocument" since="DOM Level 3">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="renameNode" id="Document3-renameNode" since="DOM Level 3">
					<parameters>
						<param name="n" type="Node" attr="in"/>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="qualifiedName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="Node" id="ID-1950641247">
				<group id="ID-1841493061" name="NodeType">
					<constant id="Node-ELEMENT_NODE" name="ELEMENT_NODE" type="unsigned short" value="1"/>
					<constant id="Node-ATTRIBUTE_NODE" name="ATTRIBUTE_NODE" type="unsigned short" value="2"/>
					<constant id="Node-TEXT_NODE" name="TEXT_NODE" type="unsigned short" value="3"/>
					<constant id="Node-CDATA_SECTION_NODE" name="CDATA_SECTION_NODE" type="unsigned short" value="4"/>
					<constant id="Node-ENTITY_REFERENCE_NODE" name="ENTITY_REFERENCE_NODE" type="unsigned short" value="5"/>
					<constant id="Node-ENTITY_NODE" name="ENTITY_NODE" type="unsigned short" value="6"/>
					<constant id="Node-PROCESSING_INSTRUCTION_NODE" name="PROCESSING_INSTRUCTION_NODE" type="unsigned short" value="7"/>
					<constant id="Node-COMMENT_NODE" name="COMMENT_NODE" type="unsigned short" value="8"/>
					<constant id="Node-DOCUMENT_NODE" name="DOCUMENT_NODE" type="unsigned short" value="9"/>
					<constant id="Node-DOCUMENT_TYPE_NODE" name="DOCUMENT_TYPE_NODE" type="unsigned short" value="10"/>
					<constant id="Node-DOCUMENT_FRAGMENT_NODE" name="DOCUMENT_FRAGMENT_NODE" type="unsigned short" value="11"/>
					<constant id="Node-NOTATION_NODE" name="NOTATION_NODE" type="unsigned short" value="12"/>
				</group>
				<attribute type="DOMString" readonly="yes" name="nodeName" id="ID-F68D095"/>
				<attribute type="DOMString" name="nodeValue" id="ID-F68D080" readonly="no">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute type="unsigned short" name="nodeType" readonly="yes" id="ID-111237558"/>
				<attribute type="Node" readonly="yes" name="parentNode" id="ID-1060184317"/>
				<attribute type="NodeList" readonly="yes" name="childNodes" id="ID-1451460987"/>
				<attribute readonly="yes" type="Node" name="firstChild" id="ID-169727388"/>
				<attribute readonly="yes" type="Node" name="lastChild" id="ID-61AD09FB"/>
				<attribute readonly="yes" type="Node" name="previousSibling" id="ID-640FB3C8"/>
				<attribute readonly="yes" type="Node" name="nextSibling" id="ID-6AC54C2F"/>
				<attribute readonly="yes" type="NamedNodeMap" name="attributes" id="ID-84CF096"/>
				<attribute readonly="yes" type="Document" name="ownerDocument" id="node-ownerDoc" version="DOM Level 2"/>
				<method name="insertBefore" id="ID-952280727" version="DOM Level 3">
					<parameters>
						<param name="newChild" type="Node" attr="in"/>
						<param name="refChild" type="Node" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="replaceChild" id="ID-785887307" version="DOM Level 3">
					<parameters>
						<param name="newChild" type="Node" attr="in"/>
						<param name="oldChild" type="Node" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="removeChild" id="ID-1734834066" version="DOM Level 3">
					<parameters>
						<param name="oldChild" type="Node" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="appendChild" id="ID-184E7107" version="DOM Level 3">
					<parameters>
						<param name="newChild" type="Node" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="hasChildNodes" id="ID-810594187">
					<parameters/>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="cloneNode" id="ID-3A0ED0A4">
					<parameters>
						<param name="deep" type="boolean" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises/>
				</method>
				<method id="ID-normalize" name="normalize" version="DOM Level 3">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="isSupported" id="Level-2-Core-Node-supports" since="DOM Level 2">
					<parameters>
						<param name="feature" type="DOMString" attr="in"/>
						<param name="version" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<attribute readonly="yes" type="DOMString" name="namespaceURI" id="ID-NodeNSname" since="DOM Level 2"/>
				<attribute type="DOMString" name="prefix" id="ID-NodeNSPrefix" since="DOM Level 2" readonly="no">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
				<attribute readonly="yes" type="DOMString" name="localName" id="ID-NodeNSLocalN" since="DOM Level 2"/>
				<method name="hasAttributes" id="ID-NodeHasAttrs" since="DOM Level 2">
					<parameters/>
					<returns type="boolean"/>
					<raises/>
				</method>
				<attribute readonly="yes" type="DOMString" name="baseURI" id="Node3-baseURI" since="DOM Level 3"/>
				<group id="DocumentPosition" name="DocumentPosition" since="DOM Level 3">
					<constant id="Node-DOCUMENT_POSITION_DISCONNECTED" name="DOCUMENT_POSITION_DISCONNECTED" type="unsigned short" value="0x01"/>
					<constant id="Node-DOCUMENT_POSITION_PRECEDING" name="DOCUMENT_POSITION_PRECEDING" type="unsigned short" value="0x02"/>
					<constant id="Node-DOCUMENT_POSITION_FOLLOWING" name="DOCUMENT_POSITION_FOLLOWING" type="unsigned short" value="0x04"/>
					<constant id="Node-DOCUMENT_POSITION_CONTAINS" name="DOCUMENT_POSITION_CONTAINS" type="unsigned short" value="0x08"/>
					<constant id="Node-DOCUMENT_POSITION_CONTAINED_BY" name="DOCUMENT_POSITION_CONTAINED_BY" type="unsigned short" value="0x10"/>
					<constant id="Node-DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC" name="DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC" type="unsigned short" value="0x20"/>
				</group>
				<method name="compareDocumentPosition" id="Node3-compareDocumentPosition" since="DOM Level 3">
					<parameters>
						<param attr="in" type="Node" name="other"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<attribute name="textContent" id="Node3-textContent" type="DOMString" readonly="no" since="DOM Level 3">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<method name="isSameNode" id="Node3-isSameNode" since="DOM Level 3">
					<parameters>
						<param attr="in" type="Node" name="other"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="lookupPrefix" id="Node3-lookupNamespacePrefix" since="DOM Level 3">
					<parameters>
						<param attr="in" type="DOMString" name="namespaceURI"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
				<method name="isDefaultNamespace" id="Node3-isDefaultNamespace" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="lookupNamespaceURI" id="Node3-lookupNamespaceURI" since="DOM Level 3">
					<parameters>
						<param attr="in" type="DOMString" name="prefix"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
				<method name="isEqualNode" id="Node3-isEqualNode" since="DOM Level 3">
					<parameters>
						<param name="arg" type="Node" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="getFeature" id="Node3-getFeature" since="DOM Level 3">
					<parameters>
						<param name="feature" type="DOMString" attr="in"/>
						<param name="version" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMObject"/>
					<raises/>
				</method>
				<method name="setUserData" id="Node3-setUserData" since="DOM Level 3">
					<parameters>
						<param name="key" type="DOMString" attr="in"/>
						<param name="data" type="DOMUserData" attr="in"/>
						<param name="handler" type="UserDataHandler" attr="in"/>
					</parameters>
					<returns type="DOMUserData"/>
					<raises/>
				</method>
				<method name="getUserData" id="Node3-getUserData" since="DOM Level 3">
					<parameters>
						<param name="key" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMUserData"/>
					<raises/>
				</method>
			</interface>
			<interface name="NodeList" id="ID-536297177">
				<method name="item" id="ID-844377136">
					<parameters>
						<param name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises/>
				</method>
				<attribute type="unsigned long" readonly="yes" name="length" id="ID-203510337"/>
			</interface>
			<interface name="NamedNodeMap" id="ID-1780488922">
				<method name="getNamedItem" id="ID-1074577549">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="setNamedItem" id="ID-1025163788">
					<parameters>
						<param name="arg" type="Node" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="removeNamedItem" id="ID-D58B193">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="item" id="ID-349467F9">
					<parameters>
						<param name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises/>
				</method>
				<attribute type="unsigned long" readonly="yes" name="length" id="ID-6D0FB19E"/>
				<method name="getNamedItemNS" id="ID-getNamedItemNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setNamedItemNS" id="ID-setNamedItemNS" since="DOM Level 2">
					<parameters>
						<param name="arg" type="Node" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="removeNamedItemNS" id="ID-removeNamedItemNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="CharacterData" inherits="Node" id="ID-FF21A306">
				<attribute type="DOMString" name="data" id="ID-72AB8359" readonly="no">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute type="unsigned long" name="length" readonly="yes" id="ID-7D61178C"/>
				<method name="substringData" id="ID-6531BCCF">
					<parameters>
						<param name="offset" type="unsigned long" attr="in"/>
						<param name="count" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="appendData" id="ID-32791A2F">
					<parameters>
						<param name="arg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="insertData" id="ID-3EDB695F">
					<parameters>
						<param name="offset" type="unsigned long" attr="in"/>
						<param name="arg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="deleteData" id="ID-7C603781">
					<parameters>
						<param name="offset" type="unsigned long" attr="in"/>
						<param name="count" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="replaceData" id="ID-E5CBA7FB">
					<parameters>
						<param name="offset" type="unsigned long" attr="in"/>
						<param name="count" type="unsigned long" attr="in"/>
						<param name="arg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="Attr" inherits="Node" id="ID-637646024">
				<attribute type="DOMString" readonly="yes" name="name" id="ID-1112119403"/>
				<attribute type="boolean" readonly="yes" name="specified" id="ID-862529273"/>
				<attribute type="DOMString" name="value" id="ID-221662474" readonly="no">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
				<attribute name="ownerElement" type="Element" readonly="yes" id="Attr-ownerElement" since="DOM Level 2"/>
				<attribute name="schemaTypeInfo" type="TypeInfo" id="Attr-schemaTypeInfo" since="DOM Level 3" readonly="yes"/>
				<attribute name="isId" id="Attr-isId" since="DOM Level 3" readonly="yes" type="boolean"/>
			</interface>
			<interface name="Element" inherits="Node" id="ID-745549614">
				<attribute type="DOMString" name="tagName" readonly="yes" id="ID-104682815"/>
				<method name="getAttribute" id="ID-666EE0F9">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
				<method name="setAttribute" id="ID-F68F082">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
						<param name="value" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="removeAttribute" id="ID-6D6AC0F9">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getAttributeNode" id="ID-217A91B8">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises/>
				</method>
				<method name="setAttributeNode" id="ID-887236154">
					<parameters>
						<param name="newAttr" type="Attr" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="removeAttributeNode" id="ID-D589198">
					<parameters>
						<param name="oldAttr" type="Attr" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getElementsByTagName" id="ID-1938918D">
					<parameters>
						<param name="tagname" type="DOMString" attr="in"/>
					</parameters>
					<returns type="NodeList"/>
					<raises/>
				</method>
				<method name="getAttributeNS" id="ID-ElGetAttrNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setAttributeNS" id="ID-ElSetAttrNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="qualifiedName" type="DOMString" attr="in"/>
						<param name="value" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="removeAttributeNS" id="ID-ElRemAtNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getAttributeNodeNS" id="ID-ElGetAtNodeNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setAttributeNodeNS" id="ID-ElSetAtNodeNS" since="DOM Level 2">
					<parameters>
						<param name="newAttr" type="Attr" attr="in"/>
					</parameters>
					<returns type="Attr"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getElementsByTagNameNS" id="ID-A6C90942" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="NodeList"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="hasAttribute" id="ID-ElHasAttr" since="DOM Level 2">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="hasAttributeNS" id="ID-ElHasAttrNS" since="DOM Level 2">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<attribute name="schemaTypeInfo" type="TypeInfo" id="Element-schemaTypeInfo" since="DOM Level 3" readonly="yes"/>
				<method name="setIdAttribute" id="ID-ElSetIdAttr" since="DOM Level 3">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
						<param name="isId" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setIdAttributeNS" id="ID-ElSetIdAttrNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="localName" type="DOMString" attr="in"/>
						<param name="isId" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setIdAttributeNode" id="ID-ElSetIdAttrNode" since="DOM Level 3">
					<parameters>
						<param name="idAttr" type="Attr" attr="in"/>
						<param name="isId" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="Text" inherits="CharacterData" id="ID-1312295772">
				<method name="splitText" id="ID-38853C1D">
					<parameters>
						<param name="offset" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="Text"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<attribute name="isElementContentWhitespace" id="Text3-isElementContentWhitespace" since="DOM Level 3" readonly="yes" type="boolean"/>
				<attribute readonly="yes" type="DOMString" name="wholeText" id="Text3-wholeText" since="DOM Level 3"/>
				<method name="replaceWholeText" id="Text3-replaceWholeText" since="DOM Level 3">
					<parameters>
						<param name="content" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Text"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="Comment" inherits="CharacterData" id="ID-1728279322"/>
			<interface name="TypeInfo" id="TypeInfo" since="DOM Level 3">
				<attribute name="typeName" type="DOMString" id="TypeInfo-typeName" readonly="yes"/>
				<attribute name="typeNamespace" type="DOMString" id="TypeInfo-typeNamespace" readonly="yes"/>
				<group name="DerivationMethods" id="TypeInfo-DerivationMethods">
					<constant id="TypeInfo-DERIVATION_RESTRICTION" name="DERIVATION_RESTRICTION" type="unsigned long" value="0x00000001"/>
					<constant id="TypeInfo-DERIVATION_EXTENSION" name="DERIVATION_EXTENSION" type="unsigned long" value="0x00000002"/>
					<constant id="TypeInfo-DERIVATION_UNION" name="DERIVATION_UNION" type="unsigned long" value="0x00000004"/>
					<constant id="TypeInfo-DERIVATION_LIST" name="DERIVATION_LIST" type="unsigned long" value="0x00000008"/>
				</group>
				<method name="isDerivedFrom" id="TypeInfo-isDerivedFrom">
					<parameters>
						<param name="typeNamespaceArg" type="DOMString" attr="in"/>
						<param name="typeNameArg" type="DOMString" attr="in"/>
						<param name="derivationMethod" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface name="UserDataHandler" id="UserDataHandler" since="DOM Level 3" role="ecmascript-function">
				<group id="ID-UserDataOperation" name="OperationType">
					<constant id="UserDataHandler-CLONED" name="NODE_CLONED" type="unsigned short" value="1"/>
					<constant id="UserDataHandler-IMPORTED" name="NODE_IMPORTED" type="unsigned short" value="2"/>
					<constant id="UserDataHandler-DELETED" name="NODE_DELETED" type="unsigned short" value="3"/>
					<constant id="UserDataHandler-RENAMED" name="NODE_RENAMED" type="unsigned short" value="4"/>
					<constant id="UserDataHandler-ADOPTED" name="NODE_ADOPTED" type="unsigned short" value="5"/>
				</group>
				<method name="handle" id="ID-handleUserDataEvent">
					<parameters>
						<param name="operation" type="unsigned short" attr="in"/>
						<param name="key" type="DOMString" attr="in"/>
						<param name="data" type="DOMUserData" attr="in"/>
						<param name="src" type="Node" attr="in"/>
						<param name="dst" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="DOMError" id="ERROR-Interfaces-DOMError" since="DOM Level 3">
				<group id="DOMError-errorSeverityCodes" name="ErrorSeverity">
					<constant name="SEVERITY_WARNING" id="ERROR-DOMError-severity-warning" type="unsigned short" value="1"/>
					<constant name="SEVERITY_ERROR" id="ERROR-DOMError-severity-error" type="unsigned short" value="2"/>
					<constant name="SEVERITY_FATAL_ERROR" id="ERROR-DOMError-severity-fatal-error" type="unsigned short" value="3"/>
				</group>
				<attribute type="unsigned short" readonly="yes" name="severity" id="ERROR-DOMError-severity"/>
				<attribute type="DOMString" readonly="yes" name="message" id="ERROR-DOMError-message"/>
				<attribute name="type" type="DOMString" readonly="yes" id="ERROR-DOMError-type"/>
				<attribute type="DOMObject" readonly="yes" name="relatedException" id="ERROR-DOMError-relatedException"/>
				<attribute type="DOMObject" readonly="yes" name="relatedData" id="ERROR-DOMError-relatedData"/>
				<attribute type="DOMLocator" readonly="yes" name="location" id="ERROR-DOMError-location"/>
			</interface>
			<interface name="DOMErrorHandler" id="ERROR-Interfaces-DOMErrorHandler" since="DOM Level 3" role="ecmascript-function">
				<method name="handleError" id="ID-ERRORS-DOMErrorHandler-handleError">
					<parameters>
						<param name="error" type="DOMError" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface name="DOMLocator" id="Interfaces-DOMLocator" since="DOM Level 3">
				<attribute type="long" readonly="yes" name="lineNumber" id="DOMLocator-line-number"/>
				<attribute type="long" readonly="yes" name="columnNumber" id="DOMLocator-column-number"/>
				<attribute type="long" readonly="yes" name="byteOffset" id="DOMLocator-byteOffset"/>
				<attribute type="long" readonly="yes" name="utf16Offset" id="DOMLocator-utf16Offset"/>
				<attribute type="Node" readonly="yes" name="relatedNode" id="DOMLocator-node"/>
				<attribute type="DOMString" readonly="yes" name="uri" id="DOMLocator-uri"/>
			</interface>
			<interface name="DOMConfiguration" id="DOMConfiguration" since="DOM Level 3">
				<method name="setParameter" id="DOMConfiguration-property">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
						<param name="value" type="DOMUserData" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="getParameter" id="DOMConfiguration-getParameter">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
					</parameters>
					<returns type="DOMUserData"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="canSetParameter" id="DOMConfiguration-canSetParameter">
					<parameters>
						<param name="name" type="DOMString" attr="in"/>
						<param name="value" type="DOMUserData" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<attribute name="parameterNames" type="DOMStringList" readonly="yes" id="DOMConfiguration-parameterNames"/>
			</interface>
			<interface name="CDATASection" inherits="Text" id="ID-667469212"/>
			<interface name="DocumentType" inherits="Node" id="ID-412266927">
				<attribute readonly="yes" name="name" type="DOMString" id="ID-1844763134"/>
				<attribute readonly="yes" name="entities" type="NamedNodeMap" id="ID-1788794630"/>
				<attribute readonly="yes" name="notations" type="NamedNodeMap" id="ID-D46829EF"/>
				<attribute readonly="yes" name="publicId" type="DOMString" id="ID-Core-DocType-publicId" since="DOM Level 2"/>
				<attribute readonly="yes" name="systemId" type="DOMString" id="ID-Core-DocType-systemId" since="DOM Level 2"/>
				<attribute readonly="yes" name="internalSubset" type="DOMString" id="ID-Core-DocType-internalSubset" since="DOM Level 2"/>
			</interface>
			<interface name="Notation" inherits="Node" id="ID-5431D1B9">
				<attribute readonly="yes" name="publicId" type="DOMString" id="ID-54F2B4D0"/>
				<attribute readonly="yes" name="systemId" type="DOMString" id="ID-E8AAB1D0"/>
			</interface>
			<interface name="Entity" inherits="Node" id="ID-527DCFF2">
				<attribute readonly="yes" name="publicId" type="DOMString" id="ID-D7303025"/>
				<attribute readonly="yes" name="systemId" type="DOMString" id="ID-D7C29F3E"/>
				<attribute readonly="yes" name="notationName" type="DOMString" id="ID-6ABAEB38"/>
				<attribute readonly="yes" type="DOMString" name="inputEncoding" id="Entity3-inputEncoding" since="DOM Level 3"/>
				<attribute readonly="yes" type="DOMString" name="xmlEncoding" id="Entity3-encoding" since="DOM Level 3"/>
				<attribute readonly="yes" type="DOMString" name="xmlVersion" id="Entity3-version" since="DOM Level 3"/>
			</interface>
			<interface name="EntityReference" inherits="Node" id="ID-11C98490"/>
			<interface name="ProcessingInstruction" inherits="Node" id="ID-1004215813">
				<attribute readonly="yes" type="DOMString" name="target" id="ID-1478689192"/>
				<attribute type="DOMString" name="data" id="ID-837822393" readonly="no">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
			</interface>
			<interface id="i18n-methods-StringExtend" name="StringExtend">
				<method id="i18n-methods-StringExtend-findOffset16" name="findOffset16">
					<parameters>
						<param name="offset32" type="int" attr="in"/>
					</parameters>
					<returns type="int"/>
					<raises>
						<exception name="StringIndexOutOfBoundsException"/>
					</raises>
				</method>
				<method id="i18n-methods-StringExtend-findOffset32" name="findOffset32">
					<parameters>
						<param attr="in" type="int" name="offset16"/>
					</parameters>
					<returns type="int"/>
					<raises>
						<exception name="StringIndexOutOfBoundsException"/>
					</raises>
				</method>
			</interface>
			<interface name="Event" id="Events-Event" since="DOM Level 2">
				<group id="Events-Event-eventPhaseType" name="PhaseType">
					<constant name="CAPTURING_PHASE" id="CAPTURING_PHASE" type="unsigned short" value="1"/>
					<constant name="AT_TARGET" id="AT_TARGET" type="unsigned short" value="2"/>
					<constant name="BUBBLING_PHASE" id="BUBBLING_PHASE" type="unsigned short" value="3"/>
				</group>
				<attribute type="DOMString" name="type" readonly="yes" id="Events-Event-type"/>
				<attribute type="EventTarget" name="target" readonly="yes" id="Events-Event-target"/>
				<attribute type="EventTarget" name="currentTarget" readonly="yes" id="Events-Event-currentTarget"/>
				<attribute type="unsigned short" name="eventPhase" readonly="yes" id="Events-Event-eventPhase"/>
				<attribute type="boolean" name="bubbles" readonly="yes" id="Events-Event-canBubble"/>
				<attribute type="boolean" name="cancelable" readonly="yes" id="Events-Event-canCancel"/>
				<attribute type="DOMTimeStamp" name="timeStamp" readonly="yes" id="Events-Event-timeStamp"/>
				<method name="stopPropagation" id="Events-Event-stopPropagation">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="preventDefault" id="Events-Event-preventDefault">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="initEvent" id="Events-Event-initEvent">
					<parameters>
						<param name="eventTypeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<attribute readonly="yes" type="DOMString" name="namespaceURI" id="Events-Event-namespaceURI" since="DOM Level 3"/>
				<method name="isCustom" id="Events-Event-isCustom" since="DOM Level 3">
					<parameters/>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="stopImmediatePropagation" id="Events-Event-stopImmediatePropagation" since="DOM Level 3">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="isDefaultPrevented" id="Events-Event-isDefaultPrevented" since="DOM Level 3">
					<parameters/>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="initEventNS" id="Events-Event-initEventNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURIArg" type="DOMString" attr="in"/>
						<param name="eventTypeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="EventTarget" id="Events-EventTarget" since="DOM Level 2">
				<method name="addEventListener" id="Events-EventTarget-addEventListener">
					<parameters>
						<param name="type" type="DOMString" attr="in"/>
						<param name="listener" type="EventListener" attr="in"/>
						<param name="useCapture" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="removeEventListener" id="Events-EventTarget-removeEventListener">
					<parameters>
						<param name="type" type="DOMString" attr="in"/>
						<param name="listener" type="EventListener" attr="in"/>
						<param name="useCapture" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="dispatchEvent" id="Events-EventTarget-dispatchEvent" version="DOM Level 3">
					<parameters>
						<param name="evt" type="Event" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises>
						<exception name="EventException"/>
					</raises>
				</method>
				<method name="addEventListenerNS" id="Events-EventTargetGroup-addEventListenerNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="type" type="DOMString" attr="in"/>
						<param name="listener" type="EventListener" attr="in"/>
						<param name="useCapture" type="boolean" attr="in"/>
						<param name="evtGroup" type="DOMObject" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="removeEventListenerNS" id="Events-EventTargetGroup-removeEventListenerNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="type" type="DOMString" attr="in"/>
						<param name="listener" type="EventListener" attr="in"/>
						<param name="useCapture" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="willTriggerNS" since="DOM Level 3" id="Events3-willTriggerNS">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="type" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="hasEventListenerNS" since="DOM Level 3" id="Events3-hasEventListenerNS">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="type" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface id="Events-EventListener" name="EventListener" since="DOM Level 2" role="ecmascript-function">
				<method name="handleEvent" id="Events-EventListener-handleEvent">
					<parameters>
						<param name="evt" type="Event" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<exception id="Events-EventException" name="EventException" since="DOM Level 2">
				<component id="Events-EventException-code" name="code">
					<typename>unsigned short</typename>
				</component>
			</exception>
			<group id="Events-EventException-EventExceptionCode" name="EventExceptionCode" since="DOM Level 2">
				<constant name="UNSPECIFIED_EVENT_TYPE_ERR" id="UNSPECIFIED_EVENT_TYPE_ERR" type="unsigned short" value="0"/>
				<constant name="DISPATCH_REQUEST_ERR" id="DISPATCH_REQUEST_ERR" type="unsigned short" value="1" since="DOM Level 3"/>
			</group>
			<interface name="DocumentEvent" id="Events-DocumentEvent" since="DOM Level 2">
				<method name="createEvent" id="Events-DocumentEvent-createEvent">
					<parameters>
						<param name="eventType" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Event"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="canDispatch" id="Events-DocumentEvent-canDispatch" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="type" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface name="CustomEvent" inherits="Event" id="Events-CustomEvent" since="DOM Level 3">
				<method name="setDispatchState" id="Events-CustomEvent-setCurrentTarget">
					<parameters>
						<param name="target" type="EventTarget" attr="in"/>
						<param name="phase" type="unsigned short" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="isPropagationStopped" id="Events-Event-isPropagationStopped">
					<parameters/>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="isImmediatePropagationStopped" id="Events-Event-isImmediatePropagationStopped">
					<parameters/>
					<returns type="boolean"/>
					<raises/>
				</method>
			</interface>
			<interface name="UIEvent" inherits="Event" id="Events-UIEvent" since="DOM Level 2">
				<attribute type="views::AbstractView" name="view" readonly="yes" id="Events-UIEvent-view"/>
				<attribute id="Events-UIEvent-detail" name="detail" type="long" readonly="yes"/>
				<method name="initUIEvent" id="Events-Event-initUIEvent">
					<parameters>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="detailArg" type="long" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="initUIEventNS" id="Events-Event-initUIEventNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="detailArg" type="long" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="TextEvent" inherits="UIEvent" id="Events-TextEvent" since="DOM Level 3">
				<attribute type="DOMString" name="data" id="Events-UIEvent-data" readonly="yes"/>
				<method name="initTextEvent" id="Events-Event-initTextEvent">
					<parameters>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="dataArg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="initTextEventNS" id="Events-Event-initTextEventNS">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="type" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="dataArg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="MouseEvent" inherits="UIEvent" id="Events-MouseEvent" since="DOM Level 2">
				<attribute type="long" name="screenX" readonly="yes" id="Events-MouseEvent-screenX"/>
				<attribute type="long" name="screenY" readonly="yes" id="Events-MouseEvent-screenY"/>
				<attribute type="long" name="clientX" readonly="yes" id="Events-MouseEvent-clientX"/>
				<attribute type="long" name="clientY" readonly="yes" id="Events-MouseEvent-clientY"/>
				<attribute type="boolean" name="ctrlKey" readonly="yes" id="Events-MouseEvent-ctrlKey"/>
				<attribute type="boolean" name="shiftKey" readonly="yes" id="Events-MouseEvent-shiftKey"/>
				<attribute type="boolean" name="altKey" readonly="yes" id="Events-MouseEvent-altKey"/>
				<attribute type="boolean" name="metaKey" readonly="yes" id="Events-MouseEvent-metaKey"/>
				<attribute type="unsigned short" name="button" readonly="yes" id="Events-MouseEvent-button"/>
				<attribute type="EventTarget" name="relatedTarget" readonly="yes" id="Events-MouseEvent-relatedTarget"/>
				<method name="initMouseEvent" id="Events-Event-initMouseEvent">
					<parameters>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="detailArg" type="long" attr="in"/>
						<param name="screenXArg" type="long" attr="in"/>
						<param name="screenYArg" type="long" attr="in"/>
						<param name="clientXArg" type="long" attr="in"/>
						<param name="clientYArg" type="long" attr="in"/>
						<param name="ctrlKeyArg" type="boolean" attr="in"/>
						<param name="altKeyArg" type="boolean" attr="in"/>
						<param name="shiftKeyArg" type="boolean" attr="in"/>
						<param name="metaKeyArg" type="boolean" attr="in"/>
						<param name="buttonArg" type="unsigned short" attr="in"/>
						<param name="relatedTargetArg" type="EventTarget" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method id="Events-MouseEvent-getModifierState" name="getModifierState" since="DOM Level 3">
					<parameters>
						<param name="keyIdentifierArg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="initMouseEventNS" id="Events-Event-initMouseEventNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="detailArg" type="long" attr="in"/>
						<param name="screenXArg" type="long" attr="in"/>
						<param name="screenYArg" type="long" attr="in"/>
						<param name="clientXArg" type="long" attr="in"/>
						<param name="clientYArg" type="long" attr="in"/>
						<param name="buttonArg" type="unsigned short" attr="in"/>
						<param name="relatedTargetArg" type="EventTarget" attr="in"/>
						<param name="modifiersList" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="KeyboardEvent" inherits="UIEvent" id="Events-KeyboardEvent" since="DOM Level 3">
				<group id="ID-KeyboardEvent-KeyLocationCode" name="KeyLocationCode">
					<constant name="DOM_KEY_LOCATION_STANDARD" id="DOM_KEY_LOCATION_STANDARD" type="unsigned long" value="0x00"/>
					<constant name="DOM_KEY_LOCATION_LEFT" id="DOM_KEY_LOCATION_LEFT" type="unsigned long" value="0x01"/>
					<constant name="DOM_KEY_LOCATION_RIGHT" id="DOM_KEY_LOCATION_RIGHT" type="unsigned long" value="0x02"/>
					<constant name="DOM_KEY_LOCATION_NUMPAD" id="DOM_KEY_LOCATION_NUMPAD" type="unsigned long" value="0x03"/>
				</group>
				<attribute type="DOMString" name="keyIdentifier" id="Events-KeyboardEvent-keyIdentifier" readonly="yes"/>
				<attribute id="Events-KeyboardEvent-keylocation" name="keyLocation" type="unsigned long" readonly="yes"/>
				<attribute name="ctrlKey" id="Events-KeyboardEvent-ctrlKey" type="boolean" readonly="yes"/>
				<attribute name="shiftKey" id="Events-KeyboardEvent-shiftKey" type="boolean" readonly="yes"/>
				<attribute name="altKey" id="Events-KeyboardEvent-altKey" type="boolean" readonly="yes"/>
				<attribute name="metaKey" id="Events-KeyboardEvent-metaKey" type="boolean" readonly="yes"/>
				<method id="Events-KeyboardEvent-getModifierState" name="getModifierState">
					<parameters>
						<param name="keyIdentifierArg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises/>
				</method>
				<method name="initKeyboardEvent" id="Events-KeyboardEvent-initKeyboardEvent">
					<parameters>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="keyIdentifierArg" type="DOMString" attr="in"/>
						<param name="keyLocationArg" type="unsigned long" attr="in"/>
						<param name="modifiersList" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="initKeyboardEventNS" id="Events-KeyboardEvent-initKeyboardEventNS">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="viewArg" type="views::AbstractView" attr="in"/>
						<param name="keyIdentifierArg" type="DOMString" attr="in"/>
						<param name="keyLocationArg" type="unsigned long" attr="in"/>
						<param name="modifiersList" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="MutationEvent" inherits="Event" id="Events-MutationEvent" since="DOM Level 2">
				<group id="Events-MutationEvent-attrChangeType" name="attrChangeType">
					<constant name="MODIFICATION" id="MODIFICATION" type="unsigned short" value="1"/>
					<constant name="ADDITION" id="ADDITION" type="unsigned short" value="2"/>
					<constant name="REMOVAL" id="REMOVAL" type="unsigned short" value="3"/>
				</group>
				<attribute type="Node" name="relatedNode" readonly="yes" id="Events-MutationEvent-relatedNode"/>
				<attribute type="DOMString" name="prevValue" readonly="yes" id="Events-MutationEvent-prevValue"/>
				<attribute type="DOMString" name="newValue" readonly="yes" id="Events-MutationEvent-newValue"/>
				<attribute type="DOMString" name="attrName" readonly="yes" id="Events-MutationEvent-attrName"/>
				<attribute type="unsigned short" name="attrChange" readonly="yes" id="Events-MutationEvent-attrChange"/>
				<method name="initMutationEvent" id="Events-Event-initMutationEvent">
					<parameters>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="relatedNodeArg" type="Node" attr="in"/>
						<param name="prevValueArg" type="DOMString" attr="in"/>
						<param name="newValueArg" type="DOMString" attr="in"/>
						<param name="attrNameArg" type="DOMString" attr="in"/>
						<param name="attrChangeArg" type="unsigned short" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="initMutationEventNS" id="Events-Event-initMutationEventNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="relatedNodeArg" type="Node" attr="in"/>
						<param name="prevValueArg" type="DOMString" attr="in"/>
						<param name="newValueArg" type="DOMString" attr="in"/>
						<param name="attrNameArg" type="DOMString" attr="in"/>
						<param name="attrChangeArg" type="unsigned short" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="MutationNameEvent" inherits="MutationEvent" id="Events-MutationNameEvent" since="DOM Level 3">
				<attribute type="DOMString" name="prevNamespaceURI" readonly="yes" id="Events-MutationNameEvent-prevNamespaceURI"/>
				<attribute type="DOMString" name="prevNodeName" readonly="yes" id="Events-MutationNameEvent-prevNodeName"/>
				<method name="initMutationNameEvent" id="Events-Event-initMutationNameEvent" since="DOM Level 3">
					<parameters>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="relatedNodeArg" type="Node" attr="in"/>
						<param name="prevNamespaceURIArg" type="DOMString" attr="in"/>
						<param name="prevNodeNameArg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
				<method name="initMutationNameEventNS" id="Events-Event-initMutationNameEventNS" since="DOM Level 3">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="typeArg" type="DOMString" attr="in"/>
						<param name="canBubbleArg" type="boolean" attr="in"/>
						<param name="cancelableArg" type="boolean" attr="in"/>
						<param name="relatedNodeArg" type="Node" attr="in"/>
						<param name="prevNamespaceURIArg" type="DOMString" attr="in"/>
						<param name="prevNodeNameArg" type="DOMString" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<exception id="LS-LSException" name="LSException">
				<component id="LS-LSException-code" name="code">
					<typename>unsigned short</typename>
				</component>
			</exception>
			<group id="LS-LSException-LSExceptionCode" name="LSExceptionCode">
				<constant name="PARSE_ERR" id="PARSE_ERR" type="unsigned short" value="81"/>
				<constant name="SERIALIZE_ERR" id="SERIALIZE_ERR" type="unsigned short" value="82"/>
			</group>
			<interface name="DOMImplementationLS" id="LS-DOMImplementation">
				<group name="DOMImplementationLSMode" id="LS-DOMImplementationLS-DOMImplementationLSMode">
					<constant name="MODE_SYNCHRONOUS" id="LS-DOMImplementationLS-MODE_SYNC" type="unsigned short" value="1"/>
					<constant name="MODE_ASYNCHRONOUS" id="LS-DOMImplementationLS-MODE_ASYNCH" type="unsigned short" value="2"/>
				</group>
				<method name="createLSParser" id="LS-DOMImplementationLS-createLSParser">
					<parameters>
						<param name="mode" type="unsigned short" attr="in"/>
						<param name="schemaType" type="DOMString" attr="in"/>
					</parameters>
					<returns type="LSParser"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createLSSerializer" id="LS-DOMImplementationLS-createLSSerializer">
					<parameters/>
					<returns type="LSSerializer"/>
					<raises/>
				</method>
				<method name="createLSInput" id="LS-DOMImplementationLS-createLSInput">
					<parameters/>
					<returns type="LSInput"/>
					<raises/>
				</method>
				<method name="createLSOutput" id="LS-DOMImplementationLS-createLSOutput">
					<parameters/>
					<returns type="LSOutput"/>
					<raises/>
				</method>
			</interface>
			<interface name="LSParser" id="LS-LSParser">
				<attribute type="DOMConfiguration" readonly="yes" name="domConfig" id="LS-LSParser-config"/>
				<attribute type="LSParserFilter" readonly="no" name="filter" id="LS-LSParser-filter"/>
				<attribute type="boolean" readonly="yes" name="async" id="LS-LSParser-async"/>
				<attribute type="boolean" readonly="yes" name="busy" id="LS-LSParser-busy"/>
				<method name="parse" id="LS-LSParser-parse">
					<parameters>
						<param name="input" type="LSInput" attr="in"/>
					</parameters>
					<returns type="Document"/>
					<raises>
						<exception name="DOMException"/>
						<exception name="LSException"/>
					</raises>
				</method>
				<method name="parseURI" id="LS-LSParser-parseURI">
					<parameters>
						<param name="uri" type="DOMString" attr="in"/>
					</parameters>
					<returns type="Document"/>
					<raises>
						<exception name="DOMException"/>
						<exception name="LSException"/>
					</raises>
				</method>
				<group name="ACTION_TYPES" id="LS-LSParser-ACTION_TYPES">
					<constant name="ACTION_APPEND_AS_CHILDREN" id="LS-LSParser-ACTION_APPEND_AS_CHILDREN" type="unsigned short" value="1"/>
					<constant name="ACTION_REPLACE_CHILDREN" id="LS-LSParser-ACTION_REPLACE_CHILDREN" type="unsigned short" value="2"/>
					<constant name="ACTION_INSERT_BEFORE" id="LS-LSParser-ACTION_INSERT_BEFORE" type="unsigned short" value="3"/>
					<constant name="ACTION_INSERT_AFTER" id="LS-LSParser-ACTION_INSERT_AFTER" type="unsigned short" value="4"/>
					<constant name="ACTION_REPLACE" id="LS-LSParser-ACTION_REPLACE" type="unsigned short" value="5"/>
				</group>
				<method name="parseWithContext" id="LS-LSParser-parseWithContext">
					<parameters>
						<param name="input" type="LSInput" attr="in"/>
						<param name="contextArg" type="Node" attr="in"/>
						<param name="action" type="unsigned short" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
						<exception name="LSException"/>
					</raises>
				</method>
				<method name="abort" id="LS-LSParser-abort">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="LSInput" id="LS-LSInput">
				<attribute type="LSReader" readonly="no" name="characterStream" id="LS-LSInput-characterStream" role="java-only"/>
				<attribute type="LSInputStream" readonly="no" name="byteStream" id="LS-LSInput-byteStream"/>
				<attribute type="DOMString" readonly="no" name="stringData" id="LS-LSInput-stringData"/>
				<attribute type="DOMString" readonly="no" name="systemId" id="LS-LSInput-systemId"/>
				<attribute type="DOMString" readonly="no" name="publicId" id="LS-LSInput-publicId"/>
				<attribute type="DOMString" readonly="no" name="baseURI" id="LS-LSInput-baseURI"/>
				<attribute type="DOMString" readonly="no" name="encoding" id="LS-LSInput-encoding"/>
				<attribute type="boolean" readonly="no" name="certifiedText" id="LS-LSInput-certifiedText"/>
			</interface>
			<interface name="LSResourceResolver" id="LS-LSResourceResolver" role="ecmascript-function">
				<method name="resolveResource" id="LS-LSResourceResolver-resolveResource">
					<parameters>
						<param name="type" type="DOMString" attr="in"/>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param name="publicId" type="DOMString" attr="in"/>
						<param name="systemId" type="DOMString" attr="in"/>
						<param name="baseURI" type="DOMString" attr="in"/>
					</parameters>
					<returns type="LSInput"/>
					<raises/>
				</method>
			</interface>
			<interface name="LSParserFilter" id="LS-LSParserFilter">
				<group name="Constants returned by startElement and acceptNode" id="LS-LSParserFilter-acceptNode-constants">
					<constant id="LS-LSParserFilter-FILTER_ACCEPT" name="FILTER_ACCEPT" type="short" value="1"/>
					<constant id="LS-LSParserFilter-FILTER_REJECT" name="FILTER_REJECT" type="short" value="2"/>
					<constant id="LS-LSParserFilter-FILTER_SKIP" name="FILTER_SKIP" type="short" value="3"/>
					<constant id="LS-LSParserFilter-FILTER_INTERRUPT" name="FILTER_INTERRUPT" type="short" value="4"/>
				</group>
				<method name="startElement" id="LS-LSParserFilter-startElement">
					<parameters>
						<param name="elementArg" type="Element" attr="in"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="acceptNode" id="LS-LSParserFilter-acceptNode">
					<parameters>
						<param name="nodeArg" type="Node" attr="in"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<attribute type="unsigned long" readonly="yes" name="whatToShow" id="LS-LSParserFilter-whatToShow"/>
			</interface>
			<interface name="LSProgressEvent" id="LS-LSProgressEvent" inherits="Event">
				<attribute type="LSInput" readonly="yes" name="input" id="LS-LSProgressEvent-input"/>
				<attribute type="unsigned long" readonly="yes" name="position" id="LS-LSProgressEvent-position"/>
				<attribute type="unsigned long" readonly="yes" name="totalSize" id="LS-LSProgressEvent-totalSize"/>
			</interface>
			<interface name="LSLoadEvent" id="LS-LSLoadEvent" inherits="Event">
				<attribute type="Document" readonly="yes" name="newDocument" id="LS-LSLoadEvent-document"/>
				<attribute type="LSInput" readonly="yes" name="input" id="LS-LSLoadEvent-input"/>
			</interface>
			<interface name="LSSerializer" id="LS-LSSerializer">
				<attribute type="DOMConfiguration" readonly="yes" name="domConfig" id="LS-LSSerializer-config"/>
				<attribute type="DOMString" readonly="no" name="newLine" id="LS-LSSerializer-newLine"/>
				<attribute type="LSSerializerFilter" readonly="no" name="filter" id="LS-LSSerializer-LSSerializerFilter"/>
				<method name="write" id="LS-LSSerializer-write">
					<parameters>
						<param name="nodeArg" type="Node" attr="in"/>
						<param name="destination" type="LSOutput" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises>
						<exception name="LSException"/>
					</raises>
				</method>
				<method name="writeToURI" id="LS-LSSerializer-writeToURI">
					<parameters>
						<param name="nodeArg" type="Node" attr="in"/>
						<param name="uri" type="DOMString" attr="in"/>
					</parameters>
					<returns type="boolean"/>
					<raises>
						<exception name="LSException"/>
					</raises>
				</method>
				<method name="writeToString" id="LS-LSSerializer-writeToString">
					<parameters>
						<param name="nodeArg" type="Node" attr="in"/>
					</parameters>
					<returns type="DOMString"/>
					<raises>
						<exception name="DOMException"/>
						<exception name="LSException"/>
					</raises>
				</method>
			</interface>
			<interface name="LSOutput" id="LS-LSOutput">
				<attribute type="LSWriter" readonly="no" name="characterStream" id="LS-LSOutput-characterStream" role="java-only"/>
				<attribute type="LSOutputStream" readonly="no" name="byteStream" id="LS-LSOutput-byteStream"/>
				<attribute type="DOMString" readonly="no" name="systemId" id="LS-LSOutput-systemId"/>
				<attribute type="DOMString" readonly="no" name="encoding" id="LS-LSOutput-encoding"/>
			</interface>
			<interface name="LSSerializerFilter" inherits="NodeFilter" id="LS-LSSerializerFilter">
				<attribute type="unsigned long" readonly="yes" name="whatToShow" id="LS-LSSerializerFilter-whatToShow"/>
			</interface>
			<exception id="ExceptionVAL" name="ExceptionVAL">
				<component id="ExceptionVAL-code" name="code">
					<typename>unsigned short</typename>
				</component>
			</exception>
			<group id="ExceptionVAL-codes" name="ExceptionVALCode">
				<constant id="ExceptionVAL-NO_SCHEMA_AVAILABLE_ERR" name="NO_SCHEMA_AVAILABLE_ERR" type="unsigned short" value="71"/>
			</group>
			<interface name="DocumentEditVAL" inherits="NodeEditVAL" id="VAL-Interfaces-DocumentEditVAL">
				<attribute name="continuousValidityChecking" type="boolean" id="DocumentEditVAL-continuousValidityChecking" readonly="no">
					<setraises>
						<exception name="DOMException"/>
						<exception name="ExceptionVAL"/>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
				<attribute name="domConfig" type="DOMConfiguration" readonly="yes" id="DocumentEditVAL-domConfig"/>
				<method name="getDefinedElements" id="DocumentEditVAL-getDefinedElements">
					<parameters>
						<param attr="in" type="DOMString" name="namespaceURI"/>
					</parameters>
					<returns type="NameList"/>
					<raises/>
				</method>
				<method name="validateDocument" id="VAL-Interfaces-DocumentEditVAL-validateDocument">
					<parameters/>
					<returns type="unsigned short"/>
					<raises/>
				</method>
			</interface>
			<interface name="NodeEditVAL" id="VAL-Interfaces-NodeEditVAL">
				<group name="validationType" id="NodeEditVAL-validationType">
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_WF" name="VAL_WF" type="unsigned short" value="1"/>
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_NS_WF" name="VAL_NS_WF" type="unsigned short" value="2"/>
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_INCOMPLETE" name="VAL_INCOMPLETE" type="unsigned short" value="3"/>
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_SCHEMA" name="VAL_SCHEMA" type="unsigned short" value="4"/>
				</group>
				<group name="validationState" id="NodeEditVAL-validationState">
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_TRUE" name="VAL_TRUE" type="unsigned short" value="5"/>
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_FALSE" name="VAL_FALSE" type="unsigned short" value="6"/>
					<constant id="VAL-Interfaces-NodeEditVAL-VAL_UNKNOWN" name="VAL_UNKNOWN" type="unsigned short" value="7"/>
				</group>
				<attribute name="defaultValue" type="DOMString" readonly="yes" id="NodeEditVAL-defaultValue"/>
				<attribute name="enumeratedValues" type="DOMStringList" readonly="yes" id="NodeEditVAL-enumeratedValues"/>
				<method name="canInsertBefore" id="VAL-Interfaces-NodeEditVAL-canInsertBefore">
					<parameters>
						<param attr="in" type="Node" name="newChild"/>
						<param attr="in" type="Node" name="refChild"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canRemoveChild" id="VAL-Interfaces-NodeEditVAL-canRemoveChild">
					<parameters>
						<param attr="in" type="Node" name="oldChild"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canReplaceChild" id="VAL-Interfaces-NodeEditVAL-canReplaceChild">
					<parameters>
						<param attr="in" type="Node" name="newChild"/>
						<param attr="in" type="Node" name="oldChild"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canAppendChild" id="VAL-Interfaces-NodeEditVAL-canAppendChild">
					<parameters>
						<param attr="in" type="Node" name="newChild"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="nodeValidity" id="NodeEditVAL-nodeValidity">
					<parameters>
						<param name="valType" type="unsigned short" attr="in"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
			</interface>
			<interface name="ElementEditVAL" inherits="NodeEditVAL" id="VAL-Interfaces-ElementEditVAL">
				<group name="ContentTypeVAL" id="ElementEditVAL-ContentTypeVAL">
					<constant id="VAL-Interfaces-ElementEditVAL-VAL_EMPTY_CONTENTTYPE" name="VAL_EMPTY_CONTENTTYPE" type="unsigned short" value="1"/>
					<constant id="VAL-Interfaces-ElementEditVAL-VAL_ANY_CONTENTTYPE" name="VAL_ANY_CONTENTTYPE" type="unsigned short" value="2"/>
					<constant id="VAL-Interfaces-ElementEditVAL-VAL_MIXED_CONTENTTYPE" name="VAL_MIXED_CONTENTTYPE" type="unsigned short" value="3"/>
					<constant id="VAL-Interfaces-ElementEditVAL-VAL_ELEMENTS_CONTENTTYPE" name="VAL_ELEMENTS_CONTENTTYPE" type="unsigned short" value="4"/>
					<constant id="VAL-Interfaces-ElementEditVAL-VAL_SIMPLE_CONTENTTYPE" name="VAL_SIMPLE_CONTENTTYPE" type="unsigned short" value="5"/>
				</group>
				<attribute name="allowedChildren" type="NameList" readonly="yes" id="ElementEditVAL-allowedChildren"/>
				<attribute name="allowedFirstChildren" type="NameList" readonly="yes" id="ElementEditVAL-allowedFirstChildren"/>
				<attribute name="allowedParents" type="NameList" readonly="yes" id="ElementEditVAL-allowedParents"/>
				<attribute name="allowedNextSiblings" type="NameList" readonly="yes" id="ElementEditVAL-allowedNextSiblings"/>
				<attribute name="allowedPreviousSiblings" type="NameList" readonly="yes" id="ElementEditVAL-allowedPreviousSiblings"/>
				<attribute name="allowedAttributes" type="NameList" readonly="yes" id="ElementEditVAL-allowedAttributes"/>
				<attribute name="requiredAttributes" type="NameList" readonly="yes" id="ElementEditVAL-requiredAttributes"/>
				<attribute name="contentType" type="unsigned short" readonly="yes" id="VAL-Interfaces-ElementEditVAL-ElementEditVAL-contentType"/>
				<method name="canSetTextContent" id="VAL-Interfaces-ElementEditVAL-canSetTextContent">
					<parameters>
						<param attr="in" type="DOMString" name="possibleTextContent"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canSetAttribute" id="VAL-Interfaces-ElementEditVAL-ElementEditVAL-canSetAttribute">
					<parameters>
						<param attr="in" type="DOMString" name="attrname"/>
						<param attr="in" type="DOMString" name="attrval"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canSetAttributeNode" id="VAL-Interfaces-ElementEditVAL-canSetAttributeNode">
					<parameters>
						<param attr="in" type="Attr" name="attrNode"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canSetAttributeNS" id="VAL-Interfaces-ElementEditVAL-canSetAttributeNS">
					<parameters>
						<param attr="in" type="DOMString" name="namespaceURI"/>
						<param attr="in" type="DOMString" name="qualifiedName"/>
						<param attr="in" type="DOMString" name="value"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canRemoveAttribute" id="VAL-Interfaces-ElementEditVAL-canRemoveAttribute">
					<parameters>
						<param attr="in" type="DOMString" name="attrname"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canRemoveAttributeNS" id="VAL-Interfaces-ElementEditVAL-canRemoveAttributeNS">
					<parameters>
						<param name="namespaceURI" type="DOMString" attr="in"/>
						<param attr="in" type="DOMString" name="localName"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canRemoveAttributeNode" id="VAL-Interfaces-ElementEditVAL-canRemoveAttributeNode">
					<parameters>
						<param attr="in" type="Node" name="attrNode"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="isElementDefined" id="VAL-Interfaces-ElementEditVAL-isElementDefined">
					<parameters>
						<param attr="in" type="DOMString" name="name"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="isElementDefinedNS" id="VAL-Interfaces-ElementEditVAL-isElementDefinedNS">
					<parameters>
						<param attr="in" type="DOMString" name="namespaceURI"/>
						<param attr="in" type="DOMString" name="name"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
			</interface>
			<interface name="CharacterDataEditVAL" inherits="NodeEditVAL" id="VAL-Interfaces-CharacterDataEditVAL">
				<method name="isWhitespaceOnly" id="VAL-Interfaces-CharacterDataEditVAL-isWhitespaceOnly">
					<parameters/>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canSetData" id="VAL-Interfaces-CharacterDataEditVAL-canSetData">
					<parameters>
						<param attr="in" type="DOMString" name="arg"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canAppendData" id="VAL-Interfaces-CharacterDataEditVAL-canAppendData">
					<parameters>
						<param attr="in" type="DOMString" name="arg"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises/>
				</method>
				<method name="canReplaceData" id="VAL-Interfaces-CharacterDataEditVAL-canReplaceData">
					<parameters>
						<param attr="in" type="unsigned long" name="offset"/>
						<param attr="in" type="unsigned long" name="count"/>
						<param attr="in" type="DOMString" name="arg"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="canInsertData" id="VAL-Interfaces-CharacterDataEditVAL-canInsertData">
					<parameters>
						<param attr="in" type="unsigned long" name="offset"/>
						<param attr="in" type="DOMString" name="arg"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="canDeleteData" id="VAL-Interfaces-CharacterDataEditVAL-canDeleteData">
					<parameters>
						<param attr="in" type="unsigned long" name="offset"/>
						<param attr="in" type="unsigned long" name="count"/>
					</parameters>
					<returns type="unsigned short"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<exception id="XPathException" name="XPathException">
				<component id="XPathException-code" name="code">
					<typename>unsigned short</typename>
				</component>
			</exception>
			<group id="XPathExceptionCode" name="XPathExceptionCode">
				<constant id="INVALID_EXPRESSION_ERR" name="INVALID_EXPRESSION_ERR" type="unsigned short" value="51"/>
				<constant id="TYPE_ERR" name="TYPE_ERR" type="unsigned short" value="52"/>
			</group>
			<interface id="XPathEvaluator" name="XPathEvaluator">
				<method id="XPathEvaluator-createExpression" name="createExpression">
					<parameters>
						<param attr="in" name="expression" type="DOMString"/>
						<param attr="in" name="resolver" type="XPathNSResolver"/>
					</parameters>
					<returns type="XPathExpression"/>
					<raises>
						<exception name="XPathException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method id="XPathEvaluator-createNSResolver" name="createNSResolver">
					<parameters>
						<param attr="in" name="nodeResolver" type="Node"/>
					</parameters>
					<returns type="XPathNSResolver"/>
					<raises/>
				</method>
				<method id="XPathEvaluator-evaluate" name="evaluate">
					<parameters>
						<param attr="in" name="expression" type="DOMString"/>
						<param attr="in" name="contextNode" type="Node"/>
						<param attr="in" name="resolver" type="XPathNSResolver"/>
						<param attr="in" name="type" type="unsigned short"/>
						<param attr="in" name="result" type="DOMObject"/>
					</parameters>
					<returns type="DOMObject"/>
					<raises>
						<exception name="XPathException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface id="XPathExpression" name="XPathExpression">
				<method id="XPathExpression-evaluate" name="evaluate">
					<parameters>
						<param attr="in" name="contextNode" type="Node"/>
						<param attr="in" name="type" type="unsigned short"/>
						<param attr="in" name="result" type="DOMObject"/>
					</parameters>
					<returns type="DOMObject"/>
					<raises>
						<exception name="XPathException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface id="XPathNSResolver" name="XPathNSResolver">
				<method name="lookupNamespaceURI" id="XPathNSResolver-lookupNamespaceURI">
					<parameters>
						<param attr="in" type="DOMString" name="prefix"/>
					</parameters>
					<returns type="DOMString"/>
					<raises/>
				</method>
			</interface>
			<interface id="XPathResult" name="XPathResult">
				<group id="XPathResultType" name="XPathResultType">
					<constant id="XPathResult-ANY-TYPE" name="ANY_TYPE" type="unsigned short" value="0"/>
					<constant id="XPathResult-NUMBER-TYPE" name="NUMBER_TYPE" type="unsigned short" value="1"/>
					<constant id="XPathResult-STRING-TYPE" name="STRING_TYPE" type="unsigned short" value="2"/>
					<constant id="XPathResult-BOOLEAN-TYPE" name="BOOLEAN_TYPE" type="unsigned short" value="3"/>
					<constant id="XPathResult-UNORDERED-NODE-ITERATOR-TYPE" name="UNORDERED_NODE_ITERATOR_TYPE" type="unsigned short" value="4"/>
					<constant id="XPathResult-ORDERED-NODE-ITERATOR-TYPE" name="ORDERED_NODE_ITERATOR_TYPE" type="unsigned short" value="5"/>
					<constant id="XPathResult-UNORDERED-NODE-SNAPSHOT-TYPE" name="UNORDERED_NODE_SNAPSHOT_TYPE" type="unsigned short" value="6"/>
					<constant id="XPathResult-ORDERED-NODE-SNAPSHOT-TYPE" name="ORDERED_NODE_SNAPSHOT_TYPE" type="unsigned short" value="7"/>
					<constant id="XPathResult-ANY-UNORDERED-NODE-TYPE" name="ANY_UNORDERED_NODE_TYPE" type="unsigned short" value="8"/>
					<constant id="XPathResult-FIRST-ORDERED-NODE-TYPE" name="FIRST_ORDERED_NODE_TYPE" type="unsigned short" value="9"/>
				</group>
				<attribute id="XPathResult-resultType" type="unsigned short" name="resultType" readonly="yes"/>
				<attribute id="XPathResult-numberValue" type="double" name="numberValue" readonly="yes">
					<getraises>
						<exception name="XPathException"/>
					</getraises>
				</attribute>
				<attribute id="XPathResult-stringValue" type="DOMString" name="stringValue" readonly="yes">
					<getraises>
						<exception name="XPathException"/>
					</getraises>
				</attribute>
				<attribute id="XPathResult-booleanValue" type="boolean" name="booleanValue" readonly="yes">
					<getraises>
						<exception name="XPathException"/>
					</getraises>
				</attribute>
				<attribute id="XPathResult-singleNodeValue" type="Node" name="singleNodeValue" readonly="yes">
					<getraises>
						<exception name="XPathException"/>
					</getraises>
				</attribute>
				<attribute type="boolean" readonly="yes" name="invalidIteratorState" id="XPathResult-invalid-iterator-state"/>
				<attribute type="unsigned long" readonly="yes" name="snapshotLength" id="XPathResult-snapshot-length">
					<getraises>
						<exception name="XPathException"/>
					</getraises>
				</attribute>
				<method id="XPathResult-iterateNext" name="iterateNext">
					<parameters/>
					<returns type="Node"/>
					<raises>
						<exception name="XPathException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method id="XPathResult-snapshotItem" name="snapshotItem">
					<parameters>
						<param id="XPathResult-snapshot-item-index" name="index" type="unsigned long" attr="in"/>
					</parameters>
					<returns type="Node"/>
					<raises>
						<exception name="XPathException"/>
					</raises>
				</method>
			</interface>
			<interface id="XPathNamespace" name="XPathNamespace" inherits="Node">
				<group id="XPathNodeType" name="XPathNodeType">
					<constant id="XPATH_NAMESPACE_NODE" name="XPATH_NAMESPACE_NODE" type="unsigned short" value="13"/>
				</group>
				<attribute type="Element" readonly="yes" name="ownerElement" id="XPathNamespace-ownerElement"/>
			</interface>
			<interface name="NodeIterator" id="Traversal-NodeIterator" since="DOM Level 2">
				<attribute id="Traversal-NodeIterator-root" name="root" type="Node" readonly="yes"/>
				<attribute id="Traversal-NodeIterator-whatToShow" name="whatToShow" type="unsigned long" readonly="yes"/>
				<attribute id="Traversal-NodeIterator-filter" name="filter" type="NodeFilter" readonly="yes"/>
				<attribute id="Traversal-NodeIterator-expandEntityReferences" name="expandEntityReferences" type="boolean" readonly="yes"/>
				<method name="nextNode" id="Traversal-NodeIterator-nextNode">
					<parameters/>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="previousNode" id="Traversal-NodeIterator-previousNode">
					<parameters/>
					<returns type="Node"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="detach" id="Traversal-NodeIterator-detach">
					<parameters/>
					<returns type="void"/>
					<raises/>
				</method>
			</interface>
			<interface name="NodeFilter" id="Traversal-NodeFilter" since="DOM Level 2" role="special">
				<group name="Constants returned by acceptNode" id="Traversal-NodeFilter-acceptNode-constants">
					<constant name="FILTER_ACCEPT" type="short" value="1"/>
					<constant name="FILTER_REJECT" type="short" value="2"/>
					<constant name="FILTER_SKIP" type="short" value="3"/>
				</group>
				<group id="Traversal-NodeFilter-whatToShow-constants" name="Constants for whatToShow">
					<constant name="SHOW_ALL" type="unsigned long" value="0xFFFFFFFF"/>
					<constant name="SHOW_ELEMENT" type="unsigned long" value="0x00000001"/>
					<constant name="SHOW_ATTRIBUTE" type="unsigned long" value="0x00000002"/>
					<constant name="SHOW_TEXT" type="unsigned long" value="0x00000004"/>
					<constant name="SHOW_CDATA_SECTION" type="unsigned long" value="0x00000008"/>
					<constant name="SHOW_ENTITY_REFERENCE" type="unsigned long" value="0x00000010"/>
					<constant name="SHOW_ENTITY" type="unsigned long" value="0x00000020"/>
					<constant name="SHOW_PROCESSING_INSTRUCTION" type="unsigned long" value="0x00000040"/>
					<constant name="SHOW_COMMENT" type="unsigned long" value="0x00000080"/>
					<constant name="SHOW_DOCUMENT" type="unsigned long" value="0x00000100"/>
					<constant name="SHOW_DOCUMENT_TYPE" type="unsigned long" value="0x00000200"/>
					<constant name="SHOW_DOCUMENT_FRAGMENT" type="unsigned long" value="0x00000400"/>
					<constant name="SHOW_NOTATION" type="unsigned long" value="0x00000800"/>
				</group>
				<method name="acceptNode" id="Traversal-NodeFilter-acceptNode">
					<parameters>
						<param name="n" type="Node" attr="in"/>
					</parameters>
					<returns type="short"/>
					<raises/>
				</method>
			</interface>
			<interface name="TreeWalker" id="Traversal-TreeWalker" since="DOM Level 2">
				<attribute id="Traversal-TreeWalker-root" name="root" type="Node" readonly="yes"/>
				<attribute id="Traversal-TreeWalker-whatToShow" name="whatToShow" type="unsigned long" readonly="yes"/>
				<attribute id="Traversal-TreeWalker-filter" name="filter" type="NodeFilter" readonly="yes"/>
				<attribute id="Traversal-TreeWalker-expandEntityReferences" name="expandEntityReferences" type="boolean" readonly="yes"/>
				<attribute id="Traversal-TreeWalker-currentNode" name="currentNode" type="Node" readonly="no">
					<setraises>
						<exception name="DOMException"/>
					</setraises>
				</attribute>
				<method name="parentNode" id="Traversal-TreeWalker-parentNode">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="firstChild" id="Traversal-TreeWalker-firstChild">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="lastChild" id="Traversal-TreeWalker-lastChild">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="previousSibling" id="Traversal-TreeWalker-previousSibling">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="nextSibling" id="Traversal-TreeWalker-nextSibling">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="previousNode" id="Traversal-TreeWalker-previousNode">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
				<method name="nextNode" id="Traversal-TreeWalker-nextNode">
					<parameters/>
					<returns type="Node"/>
					<raises/>
				</method>
			</interface>
			<interface name="DocumentTraversal" id="Traversal-Document" since="DOM Level 2">
				<method name="createNodeIterator" id="Traversal-NodeIteratorFactory-createNodeIterator">
					<parameters>
						<param name="root" type="Node" attr="in"/>
						<param name="whatToShow" type="unsigned long" attr="in"/>
						<param name="filter" type="NodeFilter" attr="in"/>
						<param name="entityReferenceExpansion" type="boolean" attr="in"/>
					</parameters>
					<returns type="NodeIterator"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="createTreeWalker" id="NodeIteratorFactory-createTreeWalker">
					<parameters>
						<param name="root" type="Node" attr="in"/>
						<param name="whatToShow" type="unsigned long" attr="in"/>
						<param name="filter" type="NodeFilter" attr="in"/>
						<param name="entityReferenceExpansion" type="boolean" attr="in"/>
					</parameters>
					<returns type="TreeWalker"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="Range" id="Level-2-Range-idl" since="DOM Level 2">
				<attribute name="startContainer" type="Node" readonly="yes" id="Level-2-Range-attr-startParent">
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute name="startOffset" type="long" readonly="yes" id="Level-2-Range-attr-startOffset">
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute name="endContainer" type="Node" readonly="yes" id="Level-2-Range-attr-endParent">
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute name="endOffset" type="long" readonly="yes" id="Level-2-Range-attr-endOffset">
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute name="collapsed" type="boolean" readonly="yes" id="Level-2-Range-attr-collapsed">
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<attribute name="commonAncestorContainer" type="Node" readonly="yes" id="Level-2-Range-attr-commonParent">
					<getraises>
						<exception name="DOMException"/>
					</getraises>
				</attribute>
				<method name="setStart" id="Level2-Range-method-setStart">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
						<param name="offset" type="long" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setEnd" id="Level2-Range-method-setEnd">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
						<param name="offset" type="long" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setStartBefore" id="Level2-Range-setStartBefore">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setStartAfter" id="Level2-Range-method-setStartAfter">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setEndBefore" id="Level2-Range-method-setEndBefore">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="setEndAfter" id="Level2-Range-method-setEndAfter">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="collapse" id="Level2-Range-method-collapse">
					<parameters>
						<param name="toStart" type="boolean" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="selectNode" id="Level2-Range-method-selectNode">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="selectNodeContents" id="Level2-Range-method-selectNodeContents">
					<parameters>
						<param name="refNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="RangeException"/>
						<exception name="DOMException"/>
					</raises>
				</method>
				<group id="Level2-Range-compareHow" name="CompareHow">
					<constant name="START_TO_START" type="unsigned short" value="0"/>
					<constant name="START_TO_END" type="unsigned short" value="1"/>
					<constant name="END_TO_END" type="unsigned short" value="2"/>
					<constant name="END_TO_START" type="unsigned short" value="3"/>
				</group>
				<method name="compareBoundaryPoints" id="Level2-Range-method-compareBoundaryPoints">
					<parameters>
						<param name="how" type="unsigned short" attr="in"/>
						<param name="sourceRange" type="Range" attr="in"/>
					</parameters>
					<returns type="short"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="deleteContents" id="Level2-Range-method-deleteContents">
					<parameters/>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="extractContents" id="Level2-Range-method-extractContents">
					<parameters/>
					<returns type="DocumentFragment"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="cloneContents" id="Level2-Range-method-cloneContents">
					<parameters/>
					<returns type="DocumentFragment"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="insertNode" id="Level2-Range-method-insertNode">
					<parameters>
						<param name="newNode" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
						<exception name="RangeException"/>
					</raises>
				</method>
				<method name="surroundContents" id="Level2-Range-method-surroundContents">
					<parameters>
						<param name="newParent" type="Node" attr="in"/>
					</parameters>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
						<exception name="RangeException"/>
					</raises>
				</method>
				<method name="cloneRange" id="Level2-Range-method-clone">
					<parameters/>
					<returns type="Range"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="toString" id="Level2-Range-method-toString">
					<parameters/>
					<returns type="DOMString"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
				<method name="detach" id="Level2-Range-method-detach">
					<parameters/>
					<returns type="void"/>
					<raises>
						<exception name="DOMException"/>
					</raises>
				</method>
			</interface>
			<interface name="DocumentRange" id="Level-2-DocumentRange-idl" since="DOM Level 2">
				<method name="createRange" id="Level2-DocumentRange-method-createRange">
					<parameters/>
					<returns type="Range"/>
					<raises/>
				</method>
			</interface>
			<exception name="RangeException" id="RangeException" since="DOM Level 2">
				<component id="RangeExceptionComponent" name="code">
					<typename>unsigned short</typename>
				</component>
			</exception>
			<group id="RangeExceptionCode" name="RangeExceptionCode">
				<constant name="BAD_BOUNDARYPOINTS_ERR" type="unsigned short" value="1"/>
				<constant name="INVALID_NODE_TYPE_ERR" type="unsigned short" value="2"/>
			</group>
		</library>
	</xsl:variable>
	<xsl:variable name="domspec" select="document('')/xsl:stylesheet/xsl:variable[@name = 'domspec1']"/>
	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="*[local-name()='suite']">
				<suite xmlns="">
					<xsl:apply-templates select="*/node()"/>
				</suite>
			</xsl:when>
			<xsl:otherwise>
				<js xmlns="">
					<xsl:apply-templates>
						<xsl:with-param name="eng" select="$engine"/>
					</xsl:apply-templates>
				</js>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='suite.member']">
		<suite.member xmlns="" href="{@href}" fleur="{substring-before(@href,'.xml')}" native="{substring-before(@href,'.xml')}">
			<Fleur>
				<xsl:apply-templates select="document(concat($path,'/',@href))/*">
					<xsl:with-param name="eng" select="'Fleur'"/>
				</xsl:apply-templates>
			</Fleur>
			<Native>
				<xsl:apply-templates select="document(concat($path,'/',@href))/*">
					<xsl:with-param name="eng" select="'Native'"/>
				</xsl:apply-templates>
			</Native>
		</suite.member>
	</xsl:template>
	
	<xsl:template match="comment()[contains(.,'Copyright')]">
		<xsl:choose>
			<xsl:when test="following-sibling::*[local-name()='suite']">
				<xsl:comment>
This ECMAScript source file was generated by test-to-ecmascript.xsl
and is a derived work from the source document.
The source document contained the following notice:
</xsl:comment>
				<xsl:value-of select="."/>
				<xsl:comment>
</xsl:comment>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>/*
This ECMAScript source file was generated by test-to-ecmascript.xsl
and is a derived work from the source document.
The source document contained the following notice:
</xsl:text>
				<xsl:value-of select="."/>
				<xsl:text>*/
</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="*[local-name()='metadata']"/>
	
	<xsl:template match="*[local-name()='test']">
		<xsl:param name="eng"/>
		<xsl:if test="*[local-name() = 'var' and @type='EventMonitor' and @name='monitor']">
			<xsl:text>// EventMonitor's require a document level variable named monitor
var monitor;
</xsl:text>
		</xsl:if>
		<xsl:if test="*[local-name() = 'var' and @type='DOMErrorMonitor' and @name='errorMonitor']">
			<xsl:text>// DOMErrorMonitor's require a document level variable named errorMonitor
var errorMonitor;
</xsl:text>
		</xsl:if>
		<xsl:if test="*[local-name() = 'var' and @type='UserDataMonitor' and @name='userDataMonitor']">
			<xsl:text>// UserDataMonitor's require a document level variable named userDataMonitor
var userDataMonitor;
</xsl:text>
		</xsl:if>
		<xsl:apply-templates mode="innerClass" select="*[local-name() = 'var'  and *[local-name() != 'member']]"/>
		<xsl:apply-templates select="*[local-name()='metadata']"/>
		<xsl:text>(function(){
	var success;
	try {
</xsl:text>
		<xsl:apply-templates mode="body">
			<xsl:with-param name="offset" select="2"/>
			<xsl:with-param name="eng" select="$eng"/>
		</xsl:apply-templates>
		<xsl:text>		return "</xsl:text>
		<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
		<xsl:text>: OK";
	} catch (e) {
</xsl:text>
		<xsl:text>		return "</xsl:text>
		<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
		<xsl:text>: Unexpected exception " + (e.stack ? "\n" + e.stack : e);
	}
})();</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='metadata']" mode="body"/>
	<xsl:template match="*[local-name()='validating']" mode="body"/>
	<xsl:template match="*[local-name()='coalescing']" mode="body"/>
	<xsl:template match="*[local-name()='expandEntityReferences']" mode="body"/>
	<xsl:template match="*[local-name()='ignoringElementContentWhitespace']" mode="body"/>
	<xsl:template match="*[local-name()='ignoringComments']" mode="body"/>
	<xsl:template match="*[local-name()='implementationAttribute']" mode="body"/>
	<xsl:template match="*[local-name()='namespaceAware']" mode="body"/>
	<xsl:template match="*[local-name()='signed']" mode="body"/>
	<xsl:template match="*[local-name()='not']" mode="body"/>

	<xsl:template match="*[local-name()='length' and @interface='DOMString']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@obj"/>
		<xsl:text>.length;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='DOMImplementationRegistry.newInstance']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = DOMImplementationRegistry;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='hasFeature']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:if test="@var">
			<xsl:value-of select="@var"/>
			<xsl:text> = </xsl:text>
			<xsl:if test="@obj">
				<xsl:value-of select="@obj"/>
				<xsl:text>.</xsl:text>
			</xsl:if>
			<xsl:text>hasFeature(</xsl:text>
			<xsl:value-of select="@feature"/>
			<xsl:text>,</xsl:text>
			<xsl:choose>
				<xsl:when test="@version">
					<xsl:value-of select="@version"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>null</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:text>);
</xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="*[local-name()='DOMImplementationRegistry.newInstance']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = DOMImplementationRegistry;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[starts-with(local-name(),'getDOMImplementation')]" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@obj"/>
		<xsl:text>.</xsl:text>
		<xsl:value-of select="local-name()"/>
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@features"/>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()= 'var']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:variable name="varname" select="@name"/>
		<xsl:choose>
			<xsl:when test="@type = 'EventMonitor'"/>
			<xsl:when test="@type = 'UserDataMonitor'"/>
			<xsl:when test="@type = 'DOMErrorMonitor'"/>
			<xsl:when test="*"/>
			<xsl:otherwise>
				<xsl:text>var </xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="$varname"/>
		<xsl:choose>
			<xsl:when test="@isNull='true'">
				<xsl:text> = null;</xsl:text>
			</xsl:when>
			<xsl:when test="@value"> = <xsl:apply-templates select="@value"/>;</xsl:when>
			<xsl:when test="@type='List' or @type='Collection'">
				<xsl:text> = new Array();
</xsl:text>
				<xsl:for-each select="*[local-name()='member']">
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:value-of select="$varname"/>
					<xsl:text>[</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>] = </xsl:text>
					<xsl:value-of select="text()"/>
					<xsl:text>;</xsl:text>
					<xsl:if test="position() != last()">
						<xsl:text>
</xsl:text>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
			<xsl:when test="@type='EventMonitor'">
				<xsl:choose>
					<xsl:when test="@name != 'monitor'">
						<xsl:message>EventMonitors must be named monitor</xsl:message>
						<xsl:text>; fail("EventMonitors must be named monitor");</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text> = new EventMonitor();</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="@type='DOMErrorMonitor'">
				<xsl:choose>
					<xsl:when test="@name != 'errorMonitor'">
						<xsl:message>DOMErrorMonitors must be named errorMonitor</xsl:message>
						<xsl:text>; fail("DOMErrorMonitors must be named errorMonitor");</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text> = new DOMErrorMonitor();</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="@type='UserDataMonitor'">
				<xsl:choose>
					<xsl:when test="@name != 'userDataMonitor'">
						<xsl:message>UserDataMonitors must be named userDataMonitor</xsl:message>
						<xsl:text>; fail("UserDataMonitors must be named userDataMonitor");</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text> = new UserDataMonitor();</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="*">
				<xsl:text> = new </xsl:text>
				<xsl:value-of select="concat(@type, generate-id(.))"/>
				<xsl:text>(</xsl:text>
				<xsl:for-each select="*[local-name() = 'var' and @value]">
					<xsl:if test="position() &gt; 1">, </xsl:if>
					<xsl:value-of select="@value"/>
				</xsl:for-each>
				<xsl:text>);</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='addEventListener' or local-name() = 'removeEventListener']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@obj"/>
		<xsl:value-of select="concat('.', concat(local-name(), '('))"/>
		<xsl:value-of select="@type"/>
		<xsl:text>, </xsl:text>
		<xsl:value-of select="@listener"/>
		<xsl:text>.handleEvent, </xsl:text>
		<xsl:value-of select="@useCapture"/>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='setParameter']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@obj"/>
		<xsl:text>.setParameter(</xsl:text>
		<xsl:value-of select="@name"/>
		<xsl:text>, </xsl:text>
		<xsl:variable name="paramValue" select="@value"/>
		<!-- xsl:variable name="paramType" select="$vardefs[@name = $paramValue]/@type"/ -->
		<xsl:variable name="paramType" select="preceding::*[local-name() = 'var' and @name = $paramValue]/@type"/>
		<xsl:value-of select="@value"/>
		<xsl:choose>
			<xsl:when test="$paramType = 'DOMErrorHandler' or $paramType = 'DOMErrorMonitor'">
				<xsl:text>.handleError</xsl:text>
			</xsl:when>
			<xsl:when test="$paramType = 'ResourceResolver'">
				<xsl:text>.resolveResource</xsl:text>
			</xsl:when>
		</xsl:choose>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='setUserData']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>if (null === </xsl:text>
		<xsl:value-of select="@handler"/>
		<xsl:text>) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:value-of select="@obj"/>
		<xsl:text>.setUserData(</xsl:text>
		<xsl:value-of select="@key"/>
		<xsl:text>, </xsl:text>
		<xsl:value-of select="@data"/>
		<xsl:text>, null);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>} else {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:value-of select="@obj"/>
		<xsl:text>.setUserData(</xsl:text>
		<xsl:value-of select="@key"/>
		<xsl:text>, </xsl:text>
		<xsl:value-of select="@data"/>
		<xsl:text>, </xsl:text>
		<xsl:value-of select="@handler"/>
		<xsl:text>.handle);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='comment']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>/* </xsl:text>
		<xsl:value-of select="."/>
		<xsl:text> */
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='wait']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>wait(</xsl:text>
		<xsl:value-of select="@milliseconds"/>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='append']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@collection"/>
		<xsl:text>[</xsl:text>
		<xsl:value-of select="@collection"/>
		<xsl:text>.length] = </xsl:text>
		<xsl:value-of select="@item"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assign']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:choose>
			<xsl:when test="substring(@value,1,1) = '&quot;' or string(number(@value)) != 'NaN'">
				<xsl:value-of select="@value"/>
				<xsl:text>;
</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="var" select="@var"/>
				<xsl:variable name="value" select="@value"/>
				<xsl:call-template name="retval-cast">
					<xsl:with-param name="variable" select="@var"/>
					<xsl:with-param name="vartype" select="ancestor::*[local-name()='test']/*[local-name() = 'var' and @name = $var]/@type"/>
					<xsl:with-param name="rettype" select="ancestor::*[local-name()='test']/*[local-name() = 'var' and @name = $value]/@type"/>
				</xsl:call-template>
				<xsl:text> </xsl:text>
				<xsl:value-of select="@value"/>
				<xsl:text>;
</xsl:text>
			</xsl:otherwise>
		</xsl:choose>	
	</xsl:template>

	<xsl:template match="*[local-name()='return']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>return </xsl:text>
		<xsl:value-of select="@value"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='increment']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> += </xsl:text>
		<xsl:value-of select="@value"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='decrement']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> -= </xsl:text>
		<xsl:value-of select="@value"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='plus']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@op1"/>
		<xsl:text> + </xsl:text>
		<xsl:value-of select="@op2"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='subtract']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@op1"/>
		<xsl:text> - </xsl:text>
		<xsl:value-of select="@op2"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='mult']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@op1"/>
		<xsl:text> * </xsl:text>
		<xsl:value-of select="@op2"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='divide']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@op1"/>
		<xsl:text> / </xsl:text>
		<xsl:value-of select="@op2"/>
		<xsl:text>;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='implementation']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:choose>
			<xsl:when test="@obj">
				<xsl:value-of select="@obj"/>
				<xsl:text>.implementation;
</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>getImplementation();
</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='createXPathEvaluator']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = createXPathEvaluator(</xsl:text>
		<xsl:value-of select="@document"/>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='fail']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>fail("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>");
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertTrue']" mode="body">
		<xsl:param name="type"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:choose>
			<xsl:when test="@actual">
				<xsl:text>if (</xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text> !== true) {
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
				<xsl:text>return "</xsl:text>
				<xsl:value-of select="@id"/>
				<xsl:text>: '</xsl:text>
				<xsl:value-of select="translate(@actual,'&quot;','~')"/>
				<xsl:text>' equals '" + </xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text> + "' not true";
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
				<xsl:text>}
</xsl:text>
				<xsl:if test="*">
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:text>if (</xsl:text>
					<xsl:value-of select="@actual"/>
					<xsl:text>) {
</xsl:text>
					<xsl:apply-templates mode="body">
						<xsl:with-param name="offset" select="$offset + 1"/>
					</xsl:apply-templates>
					<xsl:text>}
</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>if (</xsl:text>
				<xsl:apply-templates select="*[1]" mode="condition"/>
				<xsl:text> !== true) {
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
				<xsl:text>return "</xsl:text>
				<xsl:value-of select="@id"/>
				<xsl:text>: '</xsl:text>
				<xsl:variable name="actual"><xsl:apply-templates select="*[1]" mode="condition"/></xsl:variable>
				<xsl:value-of select="translate($actual,'&quot;','~')"/>
				<xsl:text>' equals '" + </xsl:text>
				<xsl:value-of select="$actual"/>
				<xsl:text> + "' not true";
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset)"/>
				<xsl:text>}
</xsl:text>
				<xsl:if test="count(*) &gt; 1">
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:text>if (</xsl:text>
					<xsl:apply-templates select="*[1]" mode="condition"/>
					<xsl:text>) {
</xsl:text>
					<xsl:apply-templates select="*[position() &gt; 1]" mode="body">
						<xsl:with-param name="offset" select="$offset + 1"/>
					</xsl:apply-templates>
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:text>}
</xsl:text>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='assertFalse']" mode="body">
		<xsl:param name="type"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:choose>
			<xsl:when test="@actual">
				<xsl:text>if (</xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text> !== false) {
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
				<xsl:text>return "</xsl:text>
				<xsl:value-of select="@id"/>
				<xsl:text>: '</xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text>' equals '" + </xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text> + "' not false";
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset)"/>
				<xsl:text>}
</xsl:text>
				<xsl:if test="*">
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:text>if (!</xsl:text>
					<xsl:value-of select="@actual"/>
					<xsl:text>) {
</xsl:text>
					<xsl:apply-templates mode="body">
						<xsl:with-param name="offset" select="$offset + 1"/>
					</xsl:apply-templates>
					<xsl:text>}
</xsl:text>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="substring($tabs,1,$offset)"/>
				<xsl:text>if (</xsl:text>
				<xsl:apply-templates select="*[1]" mode="condition"/>
				<xsl:text> !== false) {
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
				<xsl:text>return "</xsl:text>
				<xsl:value-of select="@id"/>
				<xsl:text>: '</xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text>' equals '" + </xsl:text>
				<xsl:value-of select="@actual"/>
				<xsl:text> + "' not false";
</xsl:text>
				<xsl:value-of select="substring($tabs,1,$offset)"/>
				<xsl:text>}
</xsl:text>
				<xsl:if test="count(*) &gt; 1">
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:text>if (!</xsl:text>
					<xsl:apply-templates select="*[1]" mode="condition"/>
					<xsl:text>) {
</xsl:text>
					<xsl:apply-templates select="*[position() &gt; 1]" mode="body">
						<xsl:with-param name="offset" select="$offset + 1"/>
					</xsl:apply-templates>
					<xsl:value-of select="substring($tabs,1,$offset)"/>
					<xsl:text>}
</xsl:text>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='assertNull']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>if (</xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text> != null) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>return "</xsl:text>
		<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
		<xsl:text>: #</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text> '</xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text>' equals '" + </xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text> + "' not null";
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
		<xsl:if test="*">
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>if (</xsl:text>
			<xsl:value-of select="@actual"/>
			<xsl:text> == null) {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="*[local-name()='assertNotNull']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>if (</xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text> == null) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>return "</xsl:text>
		<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
		<xsl:text>: #</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text> '</xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text>' is null";
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
		<xsl:if test="*">
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>if (</xsl:text>
			<xsl:value-of select="@actual"/>
			<xsl:text> != null) {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="*[local-name()='assertSame']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>assertSame("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>",</xsl:text>
		<xsl:value-of select="@expected"/>
		<xsl:text>,</xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text>);
</xsl:text>
		<xsl:if test="count(*) &gt; 0">
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>if (same(</xsl:text>
			<xsl:value-of select="@expected"/>
			<xsl:text>,</xsl:text>
			<xsl:value-of select="@actual"/>
			<xsl:text>)) {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="*[local-name()='assertInstanceOf']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>assertInstanceOf("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>","</xsl:text>
		<xsl:value-of select="@type"/>
		<xsl:text>",</xsl:text>
		<xsl:value-of select="@obj"/>
		<xsl:text>);
</xsl:text>
		<xsl:if test="*">
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>if (</xsl:text>
			<xsl:value-of select="@obj"/>
			<xsl:text> instanceof </xsl:text>
			<xsl:call-template name="produce-type">
				<xsl:with-param name="type" select="@type"/>
			</xsl:call-template>
			<xsl:text>) {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="*[local-name()='assertSize']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>if (</xsl:text>
		<xsl:value-of select="@collection"/>
		<xsl:text>.length !== </xsl:text>
		<xsl:value-of select="@size"/>
		<xsl:text>) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>return "</xsl:text>
		<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
		<xsl:text>: #</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text> '</xsl:text>
		<xsl:value-of select="@collection"/>
		<xsl:text>.length' equals " + </xsl:text>
		<xsl:value-of select="@collection"/>
		<xsl:text>.length + " not </xsl:text>
		<xsl:value-of select="@size"/>
		<xsl:text>";
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
		<xsl:if test="*">
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>if (size(</xsl:text>
			<xsl:value-of select="@collection"/>) == <xsl:value-of select="@size"/>
			<xsl:text>) {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 1"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="*[local-name()='assertURIEquals']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>assertURIEquals("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>",</xsl:text>
		<xsl:choose>
			<xsl:when test="@scheme"><xsl:value-of select="@scheme"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@path"><xsl:value-of select="@path"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@host"><xsl:value-of select="@host"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@file"><xsl:value-of select="@file"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@name"><xsl:value-of select="@name"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@query"><xsl:value-of select="@query"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@fragment"><xsl:value-of select="@fragment"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@isAbsolute"><xsl:value-of select="@isAbsolute"/>,</xsl:when>
			<xsl:otherwise>null,</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="@actual"/>
		<xsl:text>);
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='assertEquals']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:variable name="expected" select="@expected"/>
		<xsl:variable name="expectedType" select="ancestor::*[local-name() = 'test']/*[local-name() = 'var'  and @name = $expected]/@type"/>
		<xsl:text>if (</xsl:text>
		<xsl:choose>
			<xsl:when test="@ignoreCase='true'">
				<xsl:choose>
					<xsl:when test="$expectedType = 'Collection' or $expectedType = 'List'">
						<xsl:value-of select="@expected"/>
						<xsl:text>.join("|").toLowerCase() !== </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>.join("|").toLowerCase()) {
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
						<xsl:text>return "</xsl:text>
						<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
						<xsl:text>: #</xsl:text>
						<xsl:value-of select="@id"/>
						<xsl:text> '</xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>' equals '" + </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>.join("|").toLowerCase() + "' not '" + </xsl:text>
						<xsl:value-of select="@expected"/>
						<xsl:text>.join("|").toLowerCase() + "'";
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset)"/>
						<xsl:text>}
</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="@expected"/>
						<xsl:text>.toLowerCase() !== </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>.toLowerCase()) {
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
						<xsl:text>return "</xsl:text>
						<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
						<xsl:text>: #</xsl:text>
						<xsl:value-of select="@id"/>
						<xsl:text> '</xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>' equals '" + </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>.toLowerCase() + "' not '" + </xsl:text>
						<xsl:value-of select="@expected"/>
						<xsl:text>.toLowerCase() + "'";
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset)"/>
						<xsl:text>}
</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$expectedType = 'Collection' or $expectedType = 'List'">
						<xsl:value-of select="@expected"/>
						<xsl:text>.join("|") !== </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>.join("|")) {
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
						<xsl:text>return "</xsl:text>
						<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
						<xsl:text>: #</xsl:text>
						<xsl:value-of select="@id"/>
						<xsl:text> '</xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>' equals '" + </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>.join("|") + "' not '" + </xsl:text>
						<xsl:value-of select="@expected"/>
						<xsl:text>.join("|") + "'";
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset)"/>
						<xsl:text>}
</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="@expected"/>
						<xsl:text> !== </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>) {
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
						<xsl:text>return "</xsl:text>
						<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
						<xsl:text>: #</xsl:text>
						<xsl:value-of select="@id"/>
						<xsl:text> '</xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text>' equals '" + </xsl:text>
						<xsl:value-of select="@actual"/>
						<xsl:text> + "' not '" + </xsl:text>
						<xsl:value-of select="@expected"/>
						<xsl:text> + "'";
</xsl:text>
						<xsl:value-of select="substring($tabs,1,$offset)"/>
						<xsl:text>}
</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='assertNotEquals']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>assert("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>",</xsl:text>
		<xsl:value-of select="@expected"/>
		<xsl:text> != </xsl:text>
		<xsl:value-of select="@actual"/>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertEventCount']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>{
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>var _tmpBool = true;
</xsl:text>
		<xsl:if test="@atCount">
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>_tmpBool &amp;= (</xsl:text>
			<xsl:value-of select="@monitor"/>
			<xsl:text>.getAtCount() == </xsl:text>
			<xsl:value-of select="@atCount"/>
			<xsl:text>);
</xsl:text>
		</xsl:if>
		<xsl:if test="@captureCount">
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>_tmpBool &amp;= (</xsl:text>
			<xsl:value-of select="@monitor"/>
			<xsl:text>.getCaptureCount() == </xsl:text>
			<xsl:value-of select="@captureCount"/>
			<xsl:text>);
</xsl:text>
		</xsl:if>
		<xsl:if test="@bubbleCount">
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>_tmpBool &amp;= (</xsl:text>
			<xsl:value-of select="@monitor"/>
			<xsl:text>.getBubbleCount() == </xsl:text>
			<xsl:value-of select="@BubbleCount"/>
			<xsl:text>);
</xsl:text>
		</xsl:if>
		<xsl:if test="@totalCount">
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>_tmpBool &amp;= (</xsl:text>
			<xsl:value-of select="@monitor"/>
			<xsl:text>.getTotalCount() == </xsl:text>
			<xsl:value-of select="@totalCount"/>
			<xsl:text>);
</xsl:text>
		</xsl:if>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>assertTrue("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>",_tmpBool);
</xsl:text>
		<xsl:if test="*">
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>if (_tmpBool) {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 2"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='if']" mode="body">
		<xsl:param name="offset"/>
		<xsl:param name="eng"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>if (</xsl:text>
		<xsl:apply-templates select="*[1]" mode="condition"/>
		<xsl:text>) {
</xsl:text>
		<xsl:apply-templates select="*[position() &gt; 1 and local-name() != 'else']" mode="body">
			<xsl:with-param name="offset" select="$offset + 1"/>
			<xsl:with-param name="eng" select="$eng"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}</xsl:text>
		<xsl:for-each select="*[local-name()='else']">
			<xsl:text> else {
</xsl:text>
			<xsl:apply-templates mode="body">
				<xsl:with-param name="offset" select="$offset + 1"/>
				<xsl:with-param name="eng" select="$eng"/>
			</xsl:apply-templates>
			<xsl:value-of select="substring($tabs,1,$offset)"/>
			<xsl:text>}</xsl:text>
		</xsl:for-each>
		<xsl:text>
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='while']" mode="body">
		<xsl:param name="offset"/>
		<xsl:param name="eng"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>while (</xsl:text>
		<xsl:apply-templates select="*[1]" mode="condition"/>
		<xsl:text>) {
</xsl:text>
		<xsl:apply-templates select="*[position() &gt; 1]" mode="body">
			<xsl:with-param name="offset" select="$offset + 1"/>
			<xsl:with-param name="eng" select="$eng"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='for-each']" mode="body">
		<xsl:param name="offset"/>
		<xsl:param name="eng"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:variable name="indexvar" select="concat('index_', generate-id(.))"/>
		<xsl:text>for (var </xsl:text>
		<xsl:value-of select="$indexvar"/>
		<xsl:text> = 0; </xsl:text>
		<xsl:value-of select="$indexvar"/>
		<xsl:text> &lt; </xsl:text>
		<xsl:variable name="varname" select="@collection"/>
		<xsl:value-of select="@collection"/>
		<xsl:text>.length; </xsl:text>
		<xsl:value-of select="$indexvar"/>
		<xsl:text>++) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:value-of select="@member"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@collection"/>
		<xsl:variable name="collType" select="ancestor::*[local-name() = 'test']/*[local-name() = 'var' and @name=$varname]/@type"/>
		<xsl:choose>
			<xsl:when test="$collType = 'List' or $collType='Collection'">
				<xsl:text>[</xsl:text><xsl:value-of select="$indexvar"/><xsl:text>];
</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>.item(</xsl:text><xsl:value-of select="$indexvar"/><xsl:text>);
</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:apply-templates select="*" mode="body">
			<xsl:with-param name="offset" select="$offset + 1"/>
			<xsl:with-param name="eng" select="$eng"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='atEvents']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.atEvents;
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='capturedEvents']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.capturedEvents;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='bubbledEvents']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.bubbledEvents;
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='allEvents']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.allEvents;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='allNotifications']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.allNotifications;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='operation']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.operation;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='key']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.key;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='src' and @interface='UserDataNotification']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.src;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='dst']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.dst;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='allErrors']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/> = <xsl:value-of select="@obj"/>
		<xsl:text>.allErrors;
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertLowerSeverity']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@obj"/>
		<xsl:text>.assertLowerSeverity("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:choose>
			<xsl:when test="@severity = 'SEVERITY_WARNING'">", 1</xsl:when>
			<xsl:when test="@severity = 'SEVERITY_FATAL_ERROR'">", 3</xsl:when>
			<xsl:otherwise>", 2</xsl:otherwise>
		</xsl:choose>
		<xsl:text>);
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='data' and @interface='UserDataNotification']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = </xsl:text>
		<xsl:value-of select="@obj"/>
		<xsl:text>.data;
</xsl:text>
	</xsl:template>


	<xsl:template name="produce-type">
		<xsl:param name="type"/>
		<xsl:text>var</xsl:text>
	</xsl:template>

	<xsl:template match="@type">
		<xsl:call-template name="produce-type">
			<xsl:with-param name="type" select="."/>
		</xsl:call-template>
	</xsl:template>

	<xsl:template match="*[local-name()='handleEvent']" mode="anonInner">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>function handleEvent(listener, event, userObj) {
</xsl:text>
		<xsl:apply-templates mode="body">
			<xsl:with-param name="offset" select="$offset + 1"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='load' and not(@interface)]" mode="body">
		<xsl:param name="offset"/>
		<xsl:param name="eng"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>var </xsl:text>
		<xsl:value-of select="@var"/>
		<xsl:text>Req = new XMLHttpRequest();
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text>Req.open("GET", "</xsl:text>
		<xsl:value-of select="concat($path,'files/',@href)"/>
		<xsl:text>.xml", false);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text>Req.send();
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = new </xsl:text>
		<xsl:if test="$eng != 'Native'">
			<xsl:value-of select="concat($eng,'.')"/>
		</xsl:if>
		<xsl:text>DOMParser().parseFromString(</xsl:text>
		<xsl:value-of select="@var"/>
		<xsl:text>Req.responseText, "text/xml");
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertDOMException']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>success = false;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>try {
</xsl:text>
		<xsl:apply-templates select="*/*" mode="body">
			<xsl:with-param name="offset" select="$offset + 1"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>} catch (ex) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>if (typeof ex.code != 'undefined') {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>success = ex.code === </xsl:text>
		<xsl:variable name="excode" select="local-name(*)"/>
		<xsl:value-of select="$domspec/library/group/constant[@name = $excode]/@value"/>
		<xsl:text>;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>if (!success) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>return "</xsl:text>
		<xsl:value-of select="/*/*[local-name() = 'metadata']/*[local-name() = 'title']"/>
		<xsl:text>: Exception </xsl:text>
		<xsl:value-of select="name(*)"/>
		<xsl:text> expected";
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertEventException']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>{
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>success = false;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>try {
</xsl:text>
		<xsl:apply-templates select="*/*" mode="body">
			<xsl:with-param name="offset" select="$offset + 2"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>} catch (ex) {            
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>if (typeof(ex.code) != 'undefined') {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 3)"/>
		<xsl:text>success = ex.code == </xsl:text>
		<xsl:variable name="excode" select="local-name(*)"/>
		<xsl:value-of select="$domspec/library/group/constant[@name = $excode]/@value"/>
		<xsl:text>;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>assertTrue("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>", success);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='assertLSException']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>{
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>success = false;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>try {
</xsl:text>
		<xsl:apply-templates select="*/*" mode="body">
			<xsl:with-param name="offset" select="$offset + 2"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>} catch (ex) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>if (typeof(ex.code) != 'undefined'){
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 3)"/>
		<xsl:text>success = ex.code == </xsl:text>		            
		<xsl:variable name="excode" select="local-name(*)"/>
		<xsl:value-of select="$domspec/library/group/constant[@name = $excode]/@value"/>
		<xsl:text>;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>assertTrue("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>",success);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertXPathException']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>{
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>success = false;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>try {
</xsl:text>
		<xsl:apply-templates select="*/*" mode="body">
			<xsl:with-param name="offset" select="$offset + 2"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>} catch (ex) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>success = (typeof(ex.code) != 'undefined' &amp;&amp; ex.code == </xsl:text>		            
		<xsl:variable name="excode" select="local-name(*)"/>
		<xsl:value-of select="$domspec/library/group/constant[@name = $excode]/@value"/>
		<xsl:text>);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>assertTrue("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>",success);
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='createTempURI']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = createTempURI("</xsl:text>
		<xsl:choose>
			<xsl:when test="@scheme">
				<xsl:value-of select="@scheme"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>file</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>");
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='assertImplementationException']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>{
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>success = false;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>try {
</xsl:text>
		<xsl:apply-templates mode="body">
			<xsl:with-param name="offset" select="$offset + 2"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>} catch (ex) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
		<xsl:text>success = true;
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>assertTrue("</xsl:text>
		<xsl:value-of select="@id"/>
		<xsl:text>", success);</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="text()" mode="body"/>

	<xsl:template match="*" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:variable name="feature" select="local-name(.)"/>
		<xsl:variable name="interface" select="@interface"/>
		<xsl:variable name="method" select="$domspec/library/interface[not($interface) or @name=$interface]/method[@name = $feature]"/>
		<xsl:choose>
			<xsl:when test="$method">
				<xsl:call-template name="produce-method">                                  
					<xsl:with-param name="method" select="$method"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="attribute" select="$domspec/library/interface[not($interface) or @name = $interface]/attribute[@name = $feature]"/>
				<xsl:choose>
					<xsl:when test="$attribute">
						<xsl:call-template name="produce-attribute"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:message>Unrecognized element <xsl:value-of select="local-name(.)"/></xsl:message>
						<xsl:text>fail("Unrecognized method or attribute </xsl:text><xsl:value-of select="local-name(.)"/><xsl:text>");
</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>
</xsl:text>
	</xsl:template>

	<xsl:template name="cast">
		<xsl:param name="var"/>
		<xsl:param name="vartype"/>
		<xsl:param name="reqtype"/>
	</xsl:template>

	<xsl:template name="retval-cast">
		<xsl:param name="vartype"/>
		<xsl:param name="rettype"/>
		<xsl:param name="variable"/>
	</xsl:template>

	<xsl:template name="build-accessor">
		<xsl:param name="prefix"/>
		<xsl:param name="attribute"/>
		<xsl:value-of select="$attribute"/>
	</xsl:template>

	<xsl:template name="produce-param">
		<xsl:param name="value"/>
		<xsl:value-of select="$value"/>
	</xsl:template>

	<xsl:template name="produce-specific-attribute">
		<xsl:param name="attribute"/>
		<xsl:variable name="obj" select="@obj"/>
		<xsl:if test="@value">
			<xsl:value-of select="$obj"/>
			<xsl:text>.</xsl:text>
			<xsl:value-of select="$attribute/@name"/>
			<xsl:text> = </xsl:text>
			<xsl:value-of select="@value"/>
			<xsl:text>;</xsl:text>
		</xsl:if>
		<xsl:if test="@var">
			<xsl:value-of select="@var"/>
			<xsl:variable name="var" select="@var"/>
			<xsl:text> = </xsl:text>
			<xsl:value-of select="@obj"/>
			<xsl:text>.</xsl:text>
			<xsl:value-of select="$attribute/@name"/>
			<xsl:text>;</xsl:text>
		</xsl:if>
	</xsl:template>


	<xsl:template name="produce-specific-method">
		<xsl:param name="method"/>
		<xsl:variable name="current" select="."/>
		<xsl:variable name="obj" select="@obj"/>
		<xsl:variable name="var" select="@var"/>
		<xsl:if test="@var">
			<xsl:value-of select="@var"/>
			<xsl:text> = </xsl:text>
		</xsl:if>
		<xsl:value-of select="@obj"/>
		<xsl:text>.</xsl:text>
		<xsl:value-of select="$method/@name"/>
		<xsl:text>(</xsl:text>
		<xsl:for-each select="$method/parameters/param">
			<xsl:if test="position() &gt; 1">, </xsl:if>
			<xsl:value-of select="$current/@*[name() = current()/@name]"/>
		</xsl:for-each>
		<xsl:text>);</xsl:text>
	</xsl:template>

	<xsl:template name="produce-attribute">
		<xsl:variable name="attribName" select="local-name(.)"/>
		<xsl:choose>
			<xsl:when test="@interface">
				<xsl:variable name="interface" select="@interface"/>
				<xsl:call-template name="produce-specific-attribute">
					<xsl:with-param name="attribute" select="$domspec/library/interface[@name = $interface]/attribute[@name = $attribName]"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="produce-specific-attribute">
					<xsl:with-param name="attribute" select="$domspec/library/interface/attribute[@name = $attribName]"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="produce-method">
		<xsl:variable name="methodName" select="local-name(.)"/>
		<xsl:choose>
			<xsl:when test="@interface">
				<xsl:variable name="interface" select="@interface"/>			
				<xsl:call-template name="produce-specific-method">
					<xsl:with-param name="method" select="$domspec/library/interface[@name = $interface]/method[@name = $methodName]"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="methods" select="$domspec/library/interface/method[@name = $methodName]"/>
				<xsl:call-template name="produce-specific-method">
					<xsl:with-param name="method" select="$methods[1]"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='not']" mode="condition">
		<xsl:text>!(</xsl:text>
		<xsl:apply-templates mode="condition"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='and']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:apply-templates select="*[1]" mode="condition"/>
		<xsl:for-each select="*[position() &gt; 1]">
			<xsl:text> &amp;&amp; </xsl:text>
			<xsl:apply-templates select="." mode="condition"/>
		</xsl:for-each>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='or']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:apply-templates select="*[1]" mode="condition"/>
		<xsl:for-each select="*[position() &gt; 1]">
			<xsl:text> || </xsl:text>
			<xsl:apply-templates select="." mode="condition"/>
		</xsl:for-each>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='xor']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:apply-templates select="*[1]" mode="condition"/>
		<xsl:for-each select="*[position() &gt; 1]">
			<xsl:text> ^</xsl:text>
			<xsl:apply-templates select="." mode="condition"/>
		</xsl:for-each>
		<xsl:text>)</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='isTrue']" mode="condition">
		<xsl:value-of select="@value"/>
	</xsl:template>

	<xsl:template match="*[local-name()='isFalse']" mode="condition">
		<xsl:text>!</xsl:text>
		<xsl:value-of select="@value"/>
	</xsl:template>

	<xsl:template match="*[local-name()='same']" mode="condition">
		<xsl:text>same(</xsl:text>
		<xsl:value-of select="@expected"/>,<xsl:value-of select="@actual"/>
		<xsl:text>)</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='equals']" mode="condition">
		<xsl:call-template name="equalsCondition"/>
	</xsl:template>

	<xsl:template name="equalsCondition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@expected"/>
		<xsl:choose>
			<xsl:when test="@ignoreCase='true'">
				<xsl:text>.toUpperCase() == </xsl:text>
			</xsl:when>
			<xsl:when test="@bitmask">
				<xsl:text> &amp; </xsl:text><xsl:value-of select="@bitmask"/><xsl:text> == </xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text> == </xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="@actual"/>
		<xsl:choose>
			<xsl:when test="@ignoreCase='true'">
				<xsl:text>.toUpperCase())</xsl:text>
			</xsl:when>
			<xsl:when test="@bitmask">
				<xsl:text> &amp; </xsl:text><xsl:value-of select="@bitmask"/><xsl:text>)</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>)</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="*[local-name()='notEquals']" mode="condition">
		<xsl:text>!</xsl:text>
		<xsl:call-template name="equalsCondition"/>
	</xsl:template>


	<xsl:template match="*[local-name()='less']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@actual"/> &lt; <xsl:value-of select="@expected"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='lessOrEquals']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@actual"/> &lt;= <xsl:value-of select="@expected"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='greater']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@actual"/> &gt; <xsl:value-of select="@expected"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='greaterOrEquals']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@actual"/> &gt;= <xsl:value-of select="@expected"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='isNull']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@obj"/>
		<xsl:text> == null)</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='notNull']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@obj"/>
		<xsl:text> != null)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='instanceOf']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@obj"/> instanceOf <xsl:value-of select="@type"/>
		<xsl:text>)</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='hasSize']" mode="condition">
		<xsl:text>(</xsl:text>
		<xsl:value-of select="@obj"/>.length === <xsl:value-of select="@expected"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='contentType']" mode="condition">
		<xsl:text>("text/xml" === "</xsl:text>
		<xsl:value-of select="@type"/>
		<xsl:text>")</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='contains' and @interface='DOMString']" mode="condition">
		<xsl:text>(</xsl:text><xsl:value-of select="@obj"/>.indexOf(<xsl:value-of select="@str"/><xsl:text>) >= 0)</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='implementationAttribute']" mode="condition">
		<xsl:text>(getImplementationAttribute("</xsl:text>
		<xsl:value-of select="@name"/>
		<xsl:text>") === </xsl:text>
		<xsl:value-of select="@value"/>
		<xsl:text>)</xsl:text>
	</xsl:template>



	<xsl:template match="*[local-name()='hasFeature']" mode="condition">
		<xsl:if test="@obj">
			<xsl:value-of select="@obj"/>
			<xsl:text>.</xsl:text>
		</xsl:if>
		<xsl:text>hasFeature(</xsl:text>
		<xsl:value-of select="@feature"/>
		<xsl:text>, </xsl:text>
		<xsl:choose>
			<xsl:when test="@version">
				<xsl:value-of select="@version"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>""</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>)</xsl:text>
	</xsl:template>


	<xsl:template match="*[local-name()='try']" mode="body">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:variable name="exceptions" select="$domspec//exception[@id]"/>
		<xsl:variable name="catches" select="*[local-name() = 'catch']/*"/>
		<xsl:variable name="implException" select="$catches[local-name() = 'ImplementationException']"/>
		<xsl:text>try {
</xsl:text>
		<xsl:apply-templates select="*[local-name() != 'catch']" mode="body">
			<xsl:with-param name="vardefs" select="$vardefs"/>
			<xsl:with-param name="offset" select="$offset + 1"/>
		</xsl:apply-templates>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>} catch (ex) {
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>if (typeof(ex.code) != 'undefined') {      
</xsl:text>
		<xsl:if test="*[local-name() = 'catch']/*[local-name() != 'ImplementationException']">
			<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
			<xsl:text>switch (ex.code) {
</xsl:text>
			<xsl:for-each select="*[local-name() = 'catch']/*[local-name() != 'ImplementationException']">
				<xsl:value-of select="substring($tabs,1,$offset + 3)"/>
				<xsl:text>case </xsl:text>
				<xsl:variable name="catchCode" select="@code"/>
				<xsl:text>	/* </xsl:text><xsl:value-of select="$catchCode"/><xsl:text> */ </xsl:text>
				<xsl:for-each select="$exceptions">
					<xsl:value-of select="following-sibling::group[1]/constant[@name = $catchCode]/@value"/>
				</xsl:for-each>
				<xsl:text> :
</xsl:text> 
				<xsl:apply-templates select="*" mode="body">
					<xsl:with-param name="vardefs" select="$vardefs"/>
					<xsl:with-param name="offset" select="$offset + 4"/>
				</xsl:apply-templates>
				<xsl:if test="count(*) = 0">
					<xsl:value-of select="substring($tabs,1,$offset + 4)"/>
					<xsl:text>break;
</xsl:text>
				</xsl:if>
				<xsl:for-each select="*">
					<xsl:if test="not(following-sibling::*) and local-name() != 'return'">
						<xsl:value-of select="substring($tabs,1,$offset + 4)"/>
						<xsl:text>break;
</xsl:text>
					</xsl:if>
				</xsl:for-each>
			</xsl:for-each>
			<xsl:value-of select="substring($tabs,1,$offset + 3)"/>
			<xsl:text>default:
</xsl:text>
			<xsl:value-of select="substring($tabs,1,$offset + 4)"/>
			<xsl:text>throw ex;
</xsl:text>
			<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
			<xsl:text>}
</xsl:text>
		</xsl:if>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>} else { 
</xsl:text>
		<xsl:choose>
			<xsl:when test="*[local-name() = 'catch']/*[local-name() = 'ImplementationException']">
				<xsl:apply-templates select="*[local-name() = 'catch']/*[local-name() = 'ImplementationException']/*" mode="body">
					<xsl:with-param name="vardefs" select="$vardefs"/>
					<xsl:with-param name="offset" select="$offset + 2"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="substring($tabs,1,$offset + 2)"/>
				<xsl:text>throw ex;
</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
		<xsl:text>}
</xsl:text>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='getResourceURI']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = getResourceURI(</xsl:text>
		<xsl:value-of select="@href"/>
		<xsl:text>, "</xsl:text>
		<xsl:choose>
			<xsl:when test="@scheme">
				<xsl:value-of select="@scheme"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>file</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>", </xsl:text>
		<xsl:choose>
			<xsl:when test="@contentType">
				<xsl:text>"</xsl:text>
				<xsl:value-of select="@contentType"/>
				<xsl:text>"</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>"text/xml"</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>);
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='createTempFileURI']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = createTempFileURI();
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name()='createTempHttpURI']" mode="body">
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:value-of select="@var"/>
		<xsl:text> = createTempHttpURI();
</xsl:text>
	</xsl:template>

	<xsl:template match="*[local-name() = 'var']" mode="innerClass">
		<xsl:param name="vardefs"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>var </xsl:text>
		<xsl:value-of select="@name"/>
		<xsl:text>;
</xsl:text>
		<xsl:variable name='classFields' select="*[local-name() = 'var']"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>function </xsl:text>
		<xsl:variable name="className" select="concat(@type, generate-id(.))"/>
		<xsl:variable name="instanceVar" select="@name"/>
		<xsl:value-of select="concat($className, '(')"/>
		<xsl:for-each select="*[local-name() = 'var' and @value]">
			<xsl:if test="position() &gt; 1">
				<xsl:text>, </xsl:text>
			</xsl:if>
			<xsl:value-of select="@name"/>
		</xsl:for-each>
		<xsl:text>) { 
</xsl:text>
		<xsl:for-each select="*[local-name() = 'var' and @value]">
			<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
			<xsl:text>this.</xsl:text>
			<xsl:value-of select="@name"/>
			<xsl:text> = </xsl:text>
			<xsl:value-of select="@name"/>
			<xsl:text>;
</xsl:text>
		</xsl:for-each>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:text>}
</xsl:text>
		<xsl:variable name="interface-name" select="@type"/>
		<xsl:variable name="interface" select="$domspec/library/interface[@name=$interface-name]"/>
		<xsl:for-each select="*[local-name() != 'var']">
			<xsl:call-template name="produce-inner-feature">
				<xsl:with-param name="method-name" select="local-name()"/>
				<xsl:with-param name="interface" select="$interface"/>
				<xsl:with-param name="vardefs" select="$vardefs"/>
				<xsl:with-param name="className" select="$className"/>
				<xsl:with-param name="instanceVar" select="$instanceVar"/>
				<xsl:with-param name="classFields" select="$classFields"/>
				<xsl:with-param name="offset" select="$offset"/>
			</xsl:call-template>
		</xsl:for-each>
	</xsl:template>

	<xsl:template name="produce-inner-feature">
		<xsl:param name="interface"/>
		<xsl:param name="method-name"/>
		<xsl:param name="vardefs"/>
		<xsl:param name="className"/>
		<xsl:param name="instanceVar"/>
		<xsl:param name="classFields"/>
		<xsl:param name="offset"/>
		<xsl:value-of select="substring($tabs,1,$offset)"/>
		<xsl:variable name="method-def" select="$interface/method[@name=$method-name]"/>
		<xsl:choose>
			<xsl:when test="$method-def">
				<xsl:value-of select="$className"/>
				<xsl:text>.prototype.</xsl:text>
				<xsl:value-of select="$method-def/@name"/>
				<xsl:text> = function (</xsl:text>
				<xsl:for-each select="$method-def/parameters/param">
					<xsl:if test="position() &gt; 1">
						<xsl:text>, </xsl:text>
					</xsl:if>
					<xsl:value-of select="@name"/>
				</xsl:for-each>
				<xsl:text>) {
</xsl:text>
				<xsl:for-each select="$classFields">
					<xsl:value-of select="substring($tabs,1,$offset + 1)"/>
					<xsl:text>var </xsl:text>
					<xsl:value-of select="@name"/>
					<xsl:text> = </xsl:text>
					<xsl:value-of select="concat($instanceVar, '.')"/>
					<xsl:value-of select="@name"/>
					<xsl:text>;
</xsl:text>
				</xsl:for-each>
				<xsl:apply-templates mode="body">
					<xsl:with-param name="vardefs" select="*[local-name() = 'var'] | $method-def/parameters/param | preceding-sibling::*[local-name() = 'var']"/>
					<xsl:with-param name="offset" select="$offset + 1"/>
				</xsl:apply-templates>
				<xsl:value-of select="substring($tabs,1,$offset)"/>
				<xsl:text>}
</xsl:text>
			</xsl:when>
			<xsl:when test="$interface/attribute[@name = $method-name]">
				<xsl:value-of select="$className"/>.prototype.<xsl:value-of select="$method-name"/> = <xsl:value-of select="*[local-name() = 'get']/*[local-name() = 'return']/@value"/><xsl:text>;
</xsl:text>            
			</xsl:when>
			<xsl:when test="$interface/@inherits">
				<xsl:call-template name="produce-inner-feature">
					<xsl:with-param name="interface" select="$domspec/library/interface[@name=$interface/@inherits]"/>
					<xsl:with-param name="method-name" select="$method-name"/>
					<xsl:with-param name="className" select="$className"/>
					<xsl:with-param name="instanceVar" select="$className"/>
					<xsl:with-param name="classFields" select="$classFields"/>
					<xsl:with-param name="offset" select="$offset"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:message terminate="yes">Method <xsl:value-of select="$method-name"/> not found for interface <xsl:value-of select="$interface/@name"/>.</xsl:message>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>