"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hastscript";
exports.ids = ["vendor-chunks/hastscript"];
exports.modules = {

/***/ "(ssr)/./node_modules/hastscript/lib/create-h.js":
/*!*************************************************!*\
  !*** ./node_modules/hastscript/lib/create-h.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createH: () => (/* binding */ createH)\n/* harmony export */ });\n/* harmony import */ var comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! comma-separated-tokens */ \"(ssr)/./node_modules/comma-separated-tokens/index.js\");\n/* harmony import */ var hast_util_parse_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-parse-selector */ \"(ssr)/./node_modules/hast-util-parse-selector/lib/index.js\");\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/lib/find.js\");\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/lib/normalize.js\");\n/* harmony import */ var space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! space-separated-tokens */ \"(ssr)/./node_modules/space-separated-tokens/index.js\");\n/**\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').Nodes} Nodes\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').RootContent} RootContent\n *\n * @typedef {import('property-information').Info} Info\n * @typedef {import('property-information').Schema} Schema\n */\n\n/**\n * @typedef {Element | Root} Result\n *   Result from a `h` (or `s`) call.\n *\n * @typedef {number | string} StyleValue\n *   Value for a CSS style field.\n * @typedef {Record<string, StyleValue>} Style\n *   Supported value of a `style` prop.\n * @typedef {boolean | number | string | null | undefined} PrimitiveValue\n *   Primitive property value.\n * @typedef {Array<number | string>} ArrayValue\n *   List of property values for space- or comma separated values (such as `className`).\n * @typedef {ArrayValue | PrimitiveValue} PropertyValue\n *   Primitive value or list value.\n * @typedef {{[property: string]: PropertyValue | Style}} Properties\n *   Acceptable value for element properties.\n *\n * @typedef {number | string | null | undefined} PrimitiveChild\n *   Primitive children, either ignored (nullish), or turned into text nodes.\n * @typedef {Array<ArrayChildNested | Nodes | PrimitiveChild>} ArrayChild\n *   List of children.\n * @typedef {Array<Nodes | PrimitiveChild>} ArrayChildNested\n *   List of children (deep).\n * @typedef {ArrayChild | Nodes | PrimitiveChild} Child\n *   Acceptable child value.\n */\n\n\n\n\n\n\nconst own = {}.hasOwnProperty\n\n/**\n * @param {Schema} schema\n *   Schema to use.\n * @param {string} defaultTagName\n *   Default tag name.\n * @param {Array<string> | undefined} [caseSensitive]\n *   Case-sensitive tag names (default: `undefined`).\n * @returns\n *   `h`.\n */\nfunction createH(schema, defaultTagName, caseSensitive) {\n  const adjust = caseSensitive && createAdjustMap(caseSensitive)\n\n  /**\n   * Hyperscript compatible DSL for creating virtual hast trees.\n   *\n   * @overload\n   * @param {null | undefined} [selector]\n   * @param {...Child} children\n   * @returns {Root}\n   *\n   * @overload\n   * @param {string} selector\n   * @param {Properties} properties\n   * @param {...Child} children\n   * @returns {Element}\n   *\n   * @overload\n   * @param {string} selector\n   * @param {...Child} children\n   * @returns {Element}\n   *\n   * @param {string | null | undefined} [selector]\n   *   Selector.\n   * @param {Child | Properties | null | undefined} [properties]\n   *   Properties (or first child) (default: `undefined`).\n   * @param {...Child} children\n   *   Children.\n   * @returns {Result}\n   *   Result.\n   */\n  function h(selector, properties, ...children) {\n    let index = -1\n    /** @type {Result} */\n    let node\n\n    if (selector === undefined || selector === null) {\n      node = {type: 'root', children: []}\n      // Properties are not supported for roots.\n      const child = /** @type {Child} */ (properties)\n      children.unshift(child)\n    } else {\n      node = (0,hast_util_parse_selector__WEBPACK_IMPORTED_MODULE_0__.parseSelector)(selector, defaultTagName)\n      // Normalize the name.\n      node.tagName = node.tagName.toLowerCase()\n      if (adjust && own.call(adjust, node.tagName)) {\n        node.tagName = adjust[node.tagName]\n      }\n\n      // Handle props.\n      if (isChild(properties)) {\n        children.unshift(properties)\n      } else {\n        /** @type {string} */\n        let key\n\n        for (key in properties) {\n          if (own.call(properties, key)) {\n            addProperty(schema, node.properties, key, properties[key])\n          }\n        }\n      }\n    }\n\n    // Handle children.\n    while (++index < children.length) {\n      addChild(node.children, children[index])\n    }\n\n    if (node.type === 'element' && node.tagName === 'template') {\n      node.content = {type: 'root', children: node.children}\n      node.children = []\n    }\n\n    return node\n  }\n\n  return h\n}\n\n/**\n * Check if something is properties or a child.\n *\n * @param {Child | Properties} value\n *   Value to check.\n * @returns {value is Child}\n *   Whether `value` is definitely a child.\n */\nfunction isChild(value) {\n  // Never properties if not an object.\n  if (value === null || typeof value !== 'object' || Array.isArray(value)) {\n    return true\n  }\n\n  // Never node without `type`; that’s the main discriminator.\n  if (typeof value.type !== 'string') return false\n\n  // Slower check: never property value if object or array with\n  // non-number/strings.\n  const record = /** @type {Record<string, unknown>} */ (value)\n  const keys = Object.keys(value)\n\n  for (const key of keys) {\n    const value = record[key]\n\n    if (value && typeof value === 'object') {\n      if (!Array.isArray(value)) return true\n\n      const list = /** @type {Array<unknown>} */ (value)\n\n      for (const item of list) {\n        if (typeof item !== 'number' && typeof item !== 'string') {\n          return true\n        }\n      }\n    }\n  }\n\n  // Also see empty `children` as a node.\n  if ('children' in value && Array.isArray(value.children)) {\n    return true\n  }\n\n  // Default to properties, someone can always pass an empty object,\n  // put `data: {}` in a node,\n  // or wrap it in an array.\n  return false\n}\n\n/**\n * @param {Schema} schema\n *   Schema.\n * @param {Properties} properties\n *   Properties object.\n * @param {string} key\n *   Property name.\n * @param {PropertyValue | Style} value\n *   Property value.\n * @returns {undefined}\n *   Nothing.\n */\nfunction addProperty(schema, properties, key, value) {\n  const info = (0,property_information__WEBPACK_IMPORTED_MODULE_1__.find)(schema, key)\n  let index = -1\n  /** @type {PropertyValue} */\n  let result\n\n  // Ignore nullish and NaN values.\n  if (value === undefined || value === null) return\n\n  if (typeof value === 'number') {\n    // Ignore NaN.\n    if (Number.isNaN(value)) return\n\n    result = value\n  }\n  // Booleans.\n  else if (typeof value === 'boolean') {\n    result = value\n  }\n  // Handle list values.\n  else if (typeof value === 'string') {\n    if (info.spaceSeparated) {\n      result = (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__.parse)(value)\n    } else if (info.commaSeparated) {\n      result = (0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__.parse)(value)\n    } else if (info.commaOrSpaceSeparated) {\n      result = (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__.parse)((0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__.parse)(value).join(' '))\n    } else {\n      result = parsePrimitive(info, info.property, value)\n    }\n  } else if (Array.isArray(value)) {\n    result = value.concat()\n  } else {\n    result = info.property === 'style' ? style(value) : String(value)\n  }\n\n  if (Array.isArray(result)) {\n    /** @type {Array<number | string>} */\n    const finalResult = []\n\n    while (++index < result.length) {\n      // Assume no booleans in array.\n      const value = /** @type {number | string} */ (\n        parsePrimitive(info, info.property, result[index])\n      )\n      finalResult[index] = value\n    }\n\n    result = finalResult\n  }\n\n  // Class names (which can be added both on the `selector` and here).\n  if (info.property === 'className' && Array.isArray(properties.className)) {\n    // Assume no booleans in `className`.\n    const value = /** @type {number | string} */ (result)\n    result = properties.className.concat(value)\n  }\n\n  properties[info.property] = result\n}\n\n/**\n * @param {Array<RootContent>} nodes\n *   Children.\n * @param {Child} value\n *   Child.\n * @returns {undefined}\n *   Nothing.\n */\nfunction addChild(nodes, value) {\n  let index = -1\n\n  if (value === undefined || value === null) {\n    // Empty.\n  } else if (typeof value === 'string' || typeof value === 'number') {\n    nodes.push({type: 'text', value: String(value)})\n  } else if (Array.isArray(value)) {\n    while (++index < value.length) {\n      addChild(nodes, value[index])\n    }\n  } else if (typeof value === 'object' && 'type' in value) {\n    if (value.type === 'root') {\n      addChild(nodes, value.children)\n    } else {\n      nodes.push(value)\n    }\n  } else {\n    throw new Error('Expected node, nodes, or string, got `' + value + '`')\n  }\n}\n\n/**\n * Parse a single primitives.\n *\n * @param {Info} info\n *   Property information.\n * @param {string} name\n *   Property name.\n * @param {PrimitiveValue} value\n *   Property value.\n * @returns {PrimitiveValue}\n *   Property value.\n */\nfunction parsePrimitive(info, name, value) {\n  if (typeof value === 'string') {\n    if (info.number && value && !Number.isNaN(Number(value))) {\n      return Number(value)\n    }\n\n    if (\n      (info.boolean || info.overloadedBoolean) &&\n      (value === '' || (0,property_information__WEBPACK_IMPORTED_MODULE_4__.normalize)(value) === (0,property_information__WEBPACK_IMPORTED_MODULE_4__.normalize)(name))\n    ) {\n      return true\n    }\n  }\n\n  return value\n}\n\n/**\n * Serialize a `style` object as a string.\n *\n * @param {Style} value\n *   Style object.\n * @returns {string}\n *   CSS string.\n */\nfunction style(value) {\n  /** @type {Array<string>} */\n  const result = []\n  /** @type {string} */\n  let key\n\n  for (key in value) {\n    if (own.call(value, key)) {\n      result.push([key, value[key]].join(': '))\n    }\n  }\n\n  return result.join('; ')\n}\n\n/**\n * Create a map to adjust casing.\n *\n * @param {Array<string>} values\n *   List of properly cased keys.\n * @returns {Record<string, string>}\n *   Map of lowercase keys to uppercase keys.\n */\nfunction createAdjustMap(values) {\n  /** @type {Record<string, string>} */\n  const result = {}\n  let index = -1\n\n  while (++index < values.length) {\n    result[values[index].toLowerCase()] = values[index]\n  }\n\n  return result\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvY3JlYXRlLWguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLDRCQUE0QjtBQUN6QztBQUNBLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsdUNBQXVDO0FBQ3BEOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQSxhQUFhLDhDQUE4QztBQUMzRDtBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDO0FBQ0EsYUFBYSw2QkFBNkI7QUFDMUM7QUFDQSxjQUFjLDRDQUE0QztBQUMxRDtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQ7QUFDQSxhQUFhLGtEQUFrRDtBQUMvRDtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsYUFBYSxxQ0FBcUM7QUFDbEQ7QUFDQTs7QUFFc0Q7QUFDQTtBQUNGO0FBQ0U7O0FBRXRELGNBQWM7O0FBRWQ7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQixhQUFhLFVBQVU7QUFDdkIsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxZQUFZO0FBQ3pCLGFBQWEsVUFBVTtBQUN2QixlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFVBQVU7QUFDdkIsZUFBZTtBQUNmO0FBQ0EsYUFBYSwyQkFBMkI7QUFDeEM7QUFDQSxhQUFhLHVDQUF1QztBQUNwRDtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7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cmlwdC9saWIvY3JlYXRlLWguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuRWxlbWVudH0gRWxlbWVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLk5vZGVzfSBOb2Rlc1xuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Sb290Q29udGVudH0gUm9vdENvbnRlbnRcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdwcm9wZXJ0eS1pbmZvcm1hdGlvbicpLkluZm99IEluZm9cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3Byb3BlcnR5LWluZm9ybWF0aW9uJykuU2NoZW1hfSBTY2hlbWFcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtFbGVtZW50IHwgUm9vdH0gUmVzdWx0XG4gKiAgIFJlc3VsdCBmcm9tIGEgYGhgIChvciBgc2ApIGNhbGwuXG4gKlxuICogQHR5cGVkZWYge251bWJlciB8IHN0cmluZ30gU3R5bGVWYWx1ZVxuICogICBWYWx1ZSBmb3IgYSBDU1Mgc3R5bGUgZmllbGQuXG4gKiBAdHlwZWRlZiB7UmVjb3JkPHN0cmluZywgU3R5bGVWYWx1ZT59IFN0eWxlXG4gKiAgIFN1cHBvcnRlZCB2YWx1ZSBvZiBhIGBzdHlsZWAgcHJvcC5cbiAqIEB0eXBlZGVmIHtib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gUHJpbWl0aXZlVmFsdWVcbiAqICAgUHJpbWl0aXZlIHByb3BlcnR5IHZhbHVlLlxuICogQHR5cGVkZWYge0FycmF5PG51bWJlciB8IHN0cmluZz59IEFycmF5VmFsdWVcbiAqICAgTGlzdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgZm9yIHNwYWNlLSBvciBjb21tYSBzZXBhcmF0ZWQgdmFsdWVzIChzdWNoIGFzIGBjbGFzc05hbWVgKS5cbiAqIEB0eXBlZGVmIHtBcnJheVZhbHVlIHwgUHJpbWl0aXZlVmFsdWV9IFByb3BlcnR5VmFsdWVcbiAqICAgUHJpbWl0aXZlIHZhbHVlIG9yIGxpc3QgdmFsdWUuXG4gKiBAdHlwZWRlZiB7e1twcm9wZXJ0eTogc3RyaW5nXTogUHJvcGVydHlWYWx1ZSB8IFN0eWxlfX0gUHJvcGVydGllc1xuICogICBBY2NlcHRhYmxlIHZhbHVlIGZvciBlbGVtZW50IHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYge251bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9IFByaW1pdGl2ZUNoaWxkXG4gKiAgIFByaW1pdGl2ZSBjaGlsZHJlbiwgZWl0aGVyIGlnbm9yZWQgKG51bGxpc2gpLCBvciB0dXJuZWQgaW50byB0ZXh0IG5vZGVzLlxuICogQHR5cGVkZWYge0FycmF5PEFycmF5Q2hpbGROZXN0ZWQgfCBOb2RlcyB8IFByaW1pdGl2ZUNoaWxkPn0gQXJyYXlDaGlsZFxuICogICBMaXN0IG9mIGNoaWxkcmVuLlxuICogQHR5cGVkZWYge0FycmF5PE5vZGVzIHwgUHJpbWl0aXZlQ2hpbGQ+fSBBcnJheUNoaWxkTmVzdGVkXG4gKiAgIExpc3Qgb2YgY2hpbGRyZW4gKGRlZXApLlxuICogQHR5cGVkZWYge0FycmF5Q2hpbGQgfCBOb2RlcyB8IFByaW1pdGl2ZUNoaWxkfSBDaGlsZFxuICogICBBY2NlcHRhYmxlIGNoaWxkIHZhbHVlLlxuICovXG5cbmltcG9ydCB7cGFyc2UgYXMgY29tbWFzfSBmcm9tICdjb21tYS1zZXBhcmF0ZWQtdG9rZW5zJ1xuaW1wb3J0IHtwYXJzZVNlbGVjdG9yfSBmcm9tICdoYXN0LXV0aWwtcGFyc2Utc2VsZWN0b3InXG5pbXBvcnQge2ZpbmQsIG5vcm1hbGl6ZX0gZnJvbSAncHJvcGVydHktaW5mb3JtYXRpb24nXG5pbXBvcnQge3BhcnNlIGFzIHNwYWNlc30gZnJvbSAnc3BhY2Utc2VwYXJhdGVkLXRva2VucydcblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBAcGFyYW0ge1NjaGVtYX0gc2NoZW1hXG4gKiAgIFNjaGVtYSB0byB1c2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVmYXVsdFRhZ05hbWVcbiAqICAgRGVmYXVsdCB0YWcgbmFtZS5cbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPiB8IHVuZGVmaW5lZH0gW2Nhc2VTZW5zaXRpdmVdXG4gKiAgIENhc2Utc2Vuc2l0aXZlIHRhZyBuYW1lcyAoZGVmYXVsdDogYHVuZGVmaW5lZGApLlxuICogQHJldHVybnNcbiAqICAgYGhgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSChzY2hlbWEsIGRlZmF1bHRUYWdOYW1lLCBjYXNlU2Vuc2l0aXZlKSB7XG4gIGNvbnN0IGFkanVzdCA9IGNhc2VTZW5zaXRpdmUgJiYgY3JlYXRlQWRqdXN0TWFwKGNhc2VTZW5zaXRpdmUpXG5cbiAgLyoqXG4gICAqIEh5cGVyc2NyaXB0IGNvbXBhdGlibGUgRFNMIGZvciBjcmVhdGluZyB2aXJ0dWFsIGhhc3QgdHJlZXMuXG4gICAqXG4gICAqIEBvdmVybG9hZFxuICAgKiBAcGFyYW0ge251bGwgfCB1bmRlZmluZWR9IFtzZWxlY3Rvcl1cbiAgICogQHBhcmFtIHsuLi5DaGlsZH0gY2hpbGRyZW5cbiAgICogQHJldHVybnMge1Jvb3R9XG4gICAqXG4gICAqIEBvdmVybG9hZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7Li4uQ2hpbGR9IGNoaWxkcmVuXG4gICAqIEByZXR1cm5zIHtFbGVtZW50fVxuICAgKlxuICAgKiBAb3ZlcmxvYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAqIEBwYXJhbSB7Li4uQ2hpbGR9IGNoaWxkcmVuXG4gICAqIEByZXR1cm5zIHtFbGVtZW50fVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9IFtzZWxlY3Rvcl1cbiAgICogICBTZWxlY3Rvci5cbiAgICogQHBhcmFtIHtDaGlsZCB8IFByb3BlcnRpZXMgfCBudWxsIHwgdW5kZWZpbmVkfSBbcHJvcGVydGllc11cbiAgICogICBQcm9wZXJ0aWVzIChvciBmaXJzdCBjaGlsZCkgKGRlZmF1bHQ6IGB1bmRlZmluZWRgKS5cbiAgICogQHBhcmFtIHsuLi5DaGlsZH0gY2hpbGRyZW5cbiAgICogICBDaGlsZHJlbi5cbiAgICogQHJldHVybnMge1Jlc3VsdH1cbiAgICogICBSZXN1bHQuXG4gICAqL1xuICBmdW5jdGlvbiBoKHNlbGVjdG9yLCBwcm9wZXJ0aWVzLCAuLi5jaGlsZHJlbikge1xuICAgIGxldCBpbmRleCA9IC0xXG4gICAgLyoqIEB0eXBlIHtSZXN1bHR9ICovXG4gICAgbGV0IG5vZGVcblxuICAgIGlmIChzZWxlY3RvciA9PT0gdW5kZWZpbmVkIHx8IHNlbGVjdG9yID09PSBudWxsKSB7XG4gICAgICBub2RlID0ge3R5cGU6ICdyb290JywgY2hpbGRyZW46IFtdfVxuICAgICAgLy8gUHJvcGVydGllcyBhcmUgbm90IHN1cHBvcnRlZCBmb3Igcm9vdHMuXG4gICAgICBjb25zdCBjaGlsZCA9IC8qKiBAdHlwZSB7Q2hpbGR9ICovIChwcm9wZXJ0aWVzKVxuICAgICAgY2hpbGRyZW4udW5zaGlmdChjaGlsZClcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHBhcnNlU2VsZWN0b3Ioc2VsZWN0b3IsIGRlZmF1bHRUYWdOYW1lKVxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBuYW1lLlxuICAgICAgbm9kZS50YWdOYW1lID0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmIChhZGp1c3QgJiYgb3duLmNhbGwoYWRqdXN0LCBub2RlLnRhZ05hbWUpKSB7XG4gICAgICAgIG5vZGUudGFnTmFtZSA9IGFkanVzdFtub2RlLnRhZ05hbWVdXG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBwcm9wcy5cbiAgICAgIGlmIChpc0NoaWxkKHByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNoaWxkcmVuLnVuc2hpZnQocHJvcGVydGllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICBsZXQga2V5XG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgIGlmIChvd24uY2FsbChwcm9wZXJ0aWVzLCBrZXkpKSB7XG4gICAgICAgICAgICBhZGRQcm9wZXJ0eShzY2hlbWEsIG5vZGUucHJvcGVydGllcywga2V5LCBwcm9wZXJ0aWVzW2tleV0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGNoaWxkcmVuLlxuICAgIHdoaWxlICgrK2luZGV4IDwgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBhZGRDaGlsZChub2RlLmNoaWxkcmVuLCBjaGlsZHJlbltpbmRleF0pXG4gICAgfVxuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2VsZW1lbnQnICYmIG5vZGUudGFnTmFtZSA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgbm9kZS5jb250ZW50ID0ge3R5cGU6ICdyb290JywgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW59XG4gICAgICBub2RlLmNoaWxkcmVuID0gW11cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgcmV0dXJuIGhcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBzb21ldGhpbmcgaXMgcHJvcGVydGllcyBvciBhIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Q2hpbGQgfCBQcm9wZXJ0aWVzfSB2YWx1ZVxuICogICBWYWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHt2YWx1ZSBpcyBDaGlsZH1cbiAqICAgV2hldGhlciBgdmFsdWVgIGlzIGRlZmluaXRlbHkgYSBjaGlsZC5cbiAqL1xuZnVuY3Rpb24gaXNDaGlsZCh2YWx1ZSkge1xuICAvLyBOZXZlciBwcm9wZXJ0aWVzIGlmIG5vdCBhbiBvYmplY3QuXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIE5ldmVyIG5vZGUgd2l0aG91dCBgdHlwZWA7IHRoYXTigJlzIHRoZSBtYWluIGRpc2NyaW1pbmF0b3IuXG4gIGlmICh0eXBlb2YgdmFsdWUudHlwZSAhPT0gJ3N0cmluZycpIHJldHVybiBmYWxzZVxuXG4gIC8vIFNsb3dlciBjaGVjazogbmV2ZXIgcHJvcGVydHkgdmFsdWUgaWYgb2JqZWN0IG9yIGFycmF5IHdpdGhcbiAgLy8gbm9uLW51bWJlci9zdHJpbmdzLlxuICBjb25zdCByZWNvcmQgPSAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSAqLyAodmFsdWUpXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgY29uc3QgdmFsdWUgPSByZWNvcmRba2V5XVxuXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB0cnVlXG5cbiAgICAgIGNvbnN0IGxpc3QgPSAvKiogQHR5cGUge0FycmF5PHVua25vd24+fSAqLyAodmFsdWUpXG5cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaXN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ251bWJlcicgJiYgdHlwZW9mIGl0ZW0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEFsc28gc2VlIGVtcHR5IGBjaGlsZHJlbmAgYXMgYSBub2RlLlxuICBpZiAoJ2NoaWxkcmVuJyBpbiB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmNoaWxkcmVuKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBEZWZhdWx0IHRvIHByb3BlcnRpZXMsIHNvbWVvbmUgY2FuIGFsd2F5cyBwYXNzIGFuIGVtcHR5IG9iamVjdCxcbiAgLy8gcHV0IGBkYXRhOiB7fWAgaW4gYSBub2RlLFxuICAvLyBvciB3cmFwIGl0IGluIGFuIGFycmF5LlxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1NjaGVtYX0gc2NoZW1hXG4gKiAgIFNjaGVtYS5cbiAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllc1xuICogICBQcm9wZXJ0aWVzIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqICAgUHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSB7UHJvcGVydHlWYWx1ZSB8IFN0eWxlfSB2YWx1ZVxuICogICBQcm9wZXJ0eSB2YWx1ZS5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiAgIE5vdGhpbmcuXG4gKi9cbmZ1bmN0aW9uIGFkZFByb3BlcnR5KHNjaGVtYSwgcHJvcGVydGllcywga2V5LCB2YWx1ZSkge1xuICBjb25zdCBpbmZvID0gZmluZChzY2hlbWEsIGtleSlcbiAgbGV0IGluZGV4ID0gLTFcbiAgLyoqIEB0eXBlIHtQcm9wZXJ0eVZhbHVlfSAqL1xuICBsZXQgcmVzdWx0XG5cbiAgLy8gSWdub3JlIG51bGxpc2ggYW5kIE5hTiB2YWx1ZXMuXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIC8vIElnbm9yZSBOYU4uXG4gICAgaWYgKE51bWJlci5pc05hTih2YWx1ZSkpIHJldHVyblxuXG4gICAgcmVzdWx0ID0gdmFsdWVcbiAgfVxuICAvLyBCb29sZWFucy5cbiAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXN1bHQgPSB2YWx1ZVxuICB9XG4gIC8vIEhhbmRsZSBsaXN0IHZhbHVlcy5cbiAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGlmIChpbmZvLnNwYWNlU2VwYXJhdGVkKSB7XG4gICAgICByZXN1bHQgPSBzcGFjZXModmFsdWUpXG4gICAgfSBlbHNlIGlmIChpbmZvLmNvbW1hU2VwYXJhdGVkKSB7XG4gICAgICByZXN1bHQgPSBjb21tYXModmFsdWUpXG4gICAgfSBlbHNlIGlmIChpbmZvLmNvbW1hT3JTcGFjZVNlcGFyYXRlZCkge1xuICAgICAgcmVzdWx0ID0gc3BhY2VzKGNvbW1hcyh2YWx1ZSkuam9pbignICcpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBwYXJzZVByaW1pdGl2ZShpbmZvLCBpbmZvLnByb3BlcnR5LCB2YWx1ZSlcbiAgICB9XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXN1bHQgPSB2YWx1ZS5jb25jYXQoKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IGluZm8ucHJvcGVydHkgPT09ICdzdHlsZScgPyBzdHlsZSh2YWx1ZSkgOiBTdHJpbmcodmFsdWUpXG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgLyoqIEB0eXBlIHtBcnJheTxudW1iZXIgfCBzdHJpbmc+fSAqL1xuICAgIGNvbnN0IGZpbmFsUmVzdWx0ID0gW11cblxuICAgIHdoaWxlICgrK2luZGV4IDwgcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgLy8gQXNzdW1lIG5vIGJvb2xlYW5zIGluIGFycmF5LlxuICAgICAgY29uc3QgdmFsdWUgPSAvKiogQHR5cGUge251bWJlciB8IHN0cmluZ30gKi8gKFxuICAgICAgICBwYXJzZVByaW1pdGl2ZShpbmZvLCBpbmZvLnByb3BlcnR5LCByZXN1bHRbaW5kZXhdKVxuICAgICAgKVxuICAgICAgZmluYWxSZXN1bHRbaW5kZXhdID0gdmFsdWVcbiAgICB9XG5cbiAgICByZXN1bHQgPSBmaW5hbFJlc3VsdFxuICB9XG5cbiAgLy8gQ2xhc3MgbmFtZXMgKHdoaWNoIGNhbiBiZSBhZGRlZCBib3RoIG9uIHRoZSBgc2VsZWN0b3JgIGFuZCBoZXJlKS5cbiAgaWYgKGluZm8ucHJvcGVydHkgPT09ICdjbGFzc05hbWUnICYmIEFycmF5LmlzQXJyYXkocHJvcGVydGllcy5jbGFzc05hbWUpKSB7XG4gICAgLy8gQXNzdW1lIG5vIGJvb2xlYW5zIGluIGBjbGFzc05hbWVgLlxuICAgIGNvbnN0IHZhbHVlID0gLyoqIEB0eXBlIHtudW1iZXIgfCBzdHJpbmd9ICovIChyZXN1bHQpXG4gICAgcmVzdWx0ID0gcHJvcGVydGllcy5jbGFzc05hbWUuY29uY2F0KHZhbHVlKVxuICB9XG5cbiAgcHJvcGVydGllc1tpbmZvLnByb3BlcnR5XSA9IHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8Um9vdENvbnRlbnQ+fSBub2Rlc1xuICogICBDaGlsZHJlbi5cbiAqIEBwYXJhbSB7Q2hpbGR9IHZhbHVlXG4gKiAgIENoaWxkLlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqICAgTm90aGluZy5cbiAqL1xuZnVuY3Rpb24gYWRkQ2hpbGQobm9kZXMsIHZhbHVlKSB7XG4gIGxldCBpbmRleCA9IC0xXG5cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAvLyBFbXB0eS5cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBub2Rlcy5wdXNoKHt0eXBlOiAndGV4dCcsIHZhbHVlOiBTdHJpbmcodmFsdWUpfSlcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHdoaWxlICgrK2luZGV4IDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICBhZGRDaGlsZChub2RlcywgdmFsdWVbaW5kZXhdKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICd0eXBlJyBpbiB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZS50eXBlID09PSAncm9vdCcpIHtcbiAgICAgIGFkZENoaWxkKG5vZGVzLCB2YWx1ZS5jaGlsZHJlbilcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZXMucHVzaCh2YWx1ZSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBub2RlLCBub2Rlcywgb3Igc3RyaW5nLCBnb3QgYCcgKyB2YWx1ZSArICdgJylcbiAgfVxufVxuXG4vKipcbiAqIFBhcnNlIGEgc2luZ2xlIHByaW1pdGl2ZXMuXG4gKlxuICogQHBhcmFtIHtJbmZvfSBpbmZvXG4gKiAgIFByb3BlcnR5IGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqICAgUHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSB7UHJpbWl0aXZlVmFsdWV9IHZhbHVlXG4gKiAgIFByb3BlcnR5IHZhbHVlLlxuICogQHJldHVybnMge1ByaW1pdGl2ZVZhbHVlfVxuICogICBQcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcmltaXRpdmUoaW5mbywgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoaW5mby5udW1iZXIgJiYgdmFsdWUgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSkge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSlcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoaW5mby5ib29sZWFuIHx8IGluZm8ub3ZlcmxvYWRlZEJvb2xlYW4pICYmXG4gICAgICAodmFsdWUgPT09ICcnIHx8IG5vcm1hbGl6ZSh2YWx1ZSkgPT09IG5vcm1hbGl6ZShuYW1lKSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogU2VyaWFsaXplIGEgYHN0eWxlYCBvYmplY3QgYXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHlsZX0gdmFsdWVcbiAqICAgU3R5bGUgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgQ1NTIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gc3R5bGUodmFsdWUpIHtcbiAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICBjb25zdCByZXN1bHQgPSBbXVxuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgbGV0IGtleVxuXG4gIGZvciAoa2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKG93bi5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChba2V5LCB2YWx1ZVtrZXldXS5qb2luKCc6ICcpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQuam9pbignOyAnKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG1hcCB0byBhZGp1c3QgY2FzaW5nLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdmFsdWVzXG4gKiAgIExpc3Qgb2YgcHJvcGVybHkgY2FzZWQga2V5cy5cbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fVxuICogICBNYXAgb2YgbG93ZXJjYXNlIGtleXMgdG8gdXBwZXJjYXNlIGtleXMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFkanVzdE1hcCh2YWx1ZXMpIHtcbiAgLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSAqL1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBsZXQgaW5kZXggPSAtMVxuXG4gIHdoaWxlICgrK2luZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgIHJlc3VsdFt2YWx1ZXNbaW5kZXhdLnRvTG93ZXJDYXNlKCldID0gdmFsdWVzW2luZGV4XVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/create-h.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/hastscript/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   h: () => (/* binding */ h),\n/* harmony export */   s: () => (/* binding */ s)\n/* harmony export */ });\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/index.js\");\n/* harmony import */ var _create_h_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-h.js */ \"(ssr)/./node_modules/hastscript/lib/create-h.js\");\n/* harmony import */ var _svg_case_sensitive_tag_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg-case-sensitive-tag-names.js */ \"(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js\");\n/**\n * @typedef {import('./create-h.js').Child} Child\n *   Acceptable child value.\n * @typedef {import('./create-h.js').Properties} Properties\n *   Acceptable value for element properties.\n * @typedef {import('./create-h.js').Result} Result\n *   Result from a `h` (or `s`) call.\n */\n\n// Register the JSX namespace on `h`.\n/**\n * @typedef {import('./jsx-classic.js').Element} h.JSX.Element\n * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} h.JSX.ElementChildrenAttribute\n * @typedef {import('./jsx-classic.js').IntrinsicAttributes} h.JSX.IntrinsicAttributes\n * @typedef {import('./jsx-classic.js').IntrinsicElements} h.JSX.IntrinsicElements\n */\n\n// Register the JSX namespace on `s`.\n/**\n * @typedef {import('./jsx-classic.js').Element} s.JSX.Element\n * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} s.JSX.ElementChildrenAttribute\n * @typedef {import('./jsx-classic.js').IntrinsicAttributes} s.JSX.IntrinsicAttributes\n * @typedef {import('./jsx-classic.js').IntrinsicElements} s.JSX.IntrinsicElements\n */\n\n\n\n\n\n// Note: this explicit type is needed, otherwise TS creates broken types.\n/** @type {ReturnType<createH>} */\nconst h = (0,_create_h_js__WEBPACK_IMPORTED_MODULE_0__.createH)(property_information__WEBPACK_IMPORTED_MODULE_1__.html, 'div')\n\n// Note: this explicit type is needed, otherwise TS creates broken types.\n/** @type {ReturnType<createH>} */\nconst s = (0,_create_h_js__WEBPACK_IMPORTED_MODULE_0__.createH)(property_information__WEBPACK_IMPORTED_MODULE_1__.svg, 'g', _svg_case_sensitive_tag_names_js__WEBPACK_IMPORTED_MODULE_2__.svgCaseSensitiveTagNames)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQ7QUFDQSxhQUFhLGdDQUFnQztBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLG9DQUFvQztBQUNqRCxhQUFhLHFEQUFxRDtBQUNsRSxhQUFhLGdEQUFnRDtBQUM3RCxhQUFhLDhDQUE4QztBQUMzRDs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsYUFBYSxxREFBcUQ7QUFDbEUsYUFBYSxnREFBZ0Q7QUFDN0QsYUFBYSw4Q0FBOEM7QUFDM0Q7O0FBRThDO0FBQ1Q7QUFDcUM7O0FBRTFFO0FBQ0EsV0FBVyxxQkFBcUI7QUFDekIsVUFBVSxxREFBTyxDQUFDLHNEQUFJOztBQUU3QjtBQUNBLFdBQVcscUJBQXFCO0FBQ3pCLFVBQVUscURBQU8sQ0FBQyxxREFBRyxPQUFPLHNGQUF3QiIsInNvdXJjZXMiOlsiL2hvbWUvYXJ5YS9kZXYvbXktc2l0ZS9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NyZWF0ZS1oLmpzJykuQ2hpbGR9IENoaWxkXG4gKiAgIEFjY2VwdGFibGUgY2hpbGQgdmFsdWUuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NyZWF0ZS1oLmpzJykuUHJvcGVydGllc30gUHJvcGVydGllc1xuICogICBBY2NlcHRhYmxlIHZhbHVlIGZvciBlbGVtZW50IHByb3BlcnRpZXMuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NyZWF0ZS1oLmpzJykuUmVzdWx0fSBSZXN1bHRcbiAqICAgUmVzdWx0IGZyb20gYSBgaGAgKG9yIGBzYCkgY2FsbC5cbiAqL1xuXG4vLyBSZWdpc3RlciB0aGUgSlNYIG5hbWVzcGFjZSBvbiBgaGAuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5FbGVtZW50fSBoLkpTWC5FbGVtZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuRWxlbWVudENoaWxkcmVuQXR0cmlidXRlfSBoLkpTWC5FbGVtZW50Q2hpbGRyZW5BdHRyaWJ1dGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5JbnRyaW5zaWNBdHRyaWJ1dGVzfSBoLkpTWC5JbnRyaW5zaWNBdHRyaWJ1dGVzXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuSW50cmluc2ljRWxlbWVudHN9IGguSlNYLkludHJpbnNpY0VsZW1lbnRzXG4gKi9cblxuLy8gUmVnaXN0ZXIgdGhlIEpTWCBuYW1lc3BhY2Ugb24gYHNgLlxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuRWxlbWVudH0gcy5KU1guRWxlbWVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkVsZW1lbnRDaGlsZHJlbkF0dHJpYnV0ZX0gcy5KU1guRWxlbWVudENoaWxkcmVuQXR0cmlidXRlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuSW50cmluc2ljQXR0cmlidXRlc30gcy5KU1guSW50cmluc2ljQXR0cmlidXRlc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkludHJpbnNpY0VsZW1lbnRzfSBzLkpTWC5JbnRyaW5zaWNFbGVtZW50c1xuICovXG5cbmltcG9ydCB7aHRtbCwgc3ZnfSBmcm9tICdwcm9wZXJ0eS1pbmZvcm1hdGlvbidcbmltcG9ydCB7Y3JlYXRlSH0gZnJvbSAnLi9jcmVhdGUtaC5qcydcbmltcG9ydCB7c3ZnQ2FzZVNlbnNpdGl2ZVRhZ05hbWVzfSBmcm9tICcuL3N2Zy1jYXNlLXNlbnNpdGl2ZS10YWctbmFtZXMuanMnXG5cbi8vIE5vdGU6IHRoaXMgZXhwbGljaXQgdHlwZSBpcyBuZWVkZWQsIG90aGVyd2lzZSBUUyBjcmVhdGVzIGJyb2tlbiB0eXBlcy5cbi8qKiBAdHlwZSB7UmV0dXJuVHlwZTxjcmVhdGVIPn0gKi9cbmV4cG9ydCBjb25zdCBoID0gY3JlYXRlSChodG1sLCAnZGl2JylcblxuLy8gTm90ZTogdGhpcyBleHBsaWNpdCB0eXBlIGlzIG5lZWRlZCwgb3RoZXJ3aXNlIFRTIGNyZWF0ZXMgYnJva2VuIHR5cGVzLlxuLyoqIEB0eXBlIHtSZXR1cm5UeXBlPGNyZWF0ZUg+fSAqL1xuZXhwb3J0IGNvbnN0IHMgPSBjcmVhdGVIKHN2ZywgJ2cnLCBzdmdDYXNlU2Vuc2l0aXZlVGFnTmFtZXMpXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js":
/*!*********************************************************************!*\
  !*** ./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   svgCaseSensitiveTagNames: () => (/* binding */ svgCaseSensitiveTagNames)\n/* harmony export */ });\nconst svgCaseSensitiveTagNames = [\n  'altGlyph',\n  'altGlyphDef',\n  'altGlyphItem',\n  'animateColor',\n  'animateMotion',\n  'animateTransform',\n  'clipPath',\n  'feBlend',\n  'feColorMatrix',\n  'feComponentTransfer',\n  'feComposite',\n  'feConvolveMatrix',\n  'feDiffuseLighting',\n  'feDisplacementMap',\n  'feDistantLight',\n  'feDropShadow',\n  'feFlood',\n  'feFuncA',\n  'feFuncB',\n  'feFuncG',\n  'feFuncR',\n  'feGaussianBlur',\n  'feImage',\n  'feMerge',\n  'feMergeNode',\n  'feMorphology',\n  'feOffset',\n  'fePointLight',\n  'feSpecularLighting',\n  'feSpotLight',\n  'feTile',\n  'feTurbulence',\n  'foreignObject',\n  'glyphRef',\n  'linearGradient',\n  'radialGradient',\n  'solidColor',\n  'textArea',\n  'textPath'\n]\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvc3ZnLWNhc2Utc2Vuc2l0aXZlLXRhZy1uYW1lcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL2hvbWUvYXJ5YS9kZXYvbXktc2l0ZS9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvc3ZnLWNhc2Utc2Vuc2l0aXZlLXRhZy1uYW1lcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc3ZnQ2FzZVNlbnNpdGl2ZVRhZ05hbWVzID0gW1xuICAnYWx0R2x5cGgnLFxuICAnYWx0R2x5cGhEZWYnLFxuICAnYWx0R2x5cGhJdGVtJyxcbiAgJ2FuaW1hdGVDb2xvcicsXG4gICdhbmltYXRlTW90aW9uJyxcbiAgJ2FuaW1hdGVUcmFuc2Zvcm0nLFxuICAnY2xpcFBhdGgnLFxuICAnZmVCbGVuZCcsXG4gICdmZUNvbG9yTWF0cml4JyxcbiAgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLFxuICAnZmVDb21wb3NpdGUnLFxuICAnZmVDb252b2x2ZU1hdHJpeCcsXG4gICdmZURpZmZ1c2VMaWdodGluZycsXG4gICdmZURpc3BsYWNlbWVudE1hcCcsXG4gICdmZURpc3RhbnRMaWdodCcsXG4gICdmZURyb3BTaGFkb3cnLFxuICAnZmVGbG9vZCcsXG4gICdmZUZ1bmNBJyxcbiAgJ2ZlRnVuY0InLFxuICAnZmVGdW5jRycsXG4gICdmZUZ1bmNSJyxcbiAgJ2ZlR2F1c3NpYW5CbHVyJyxcbiAgJ2ZlSW1hZ2UnLFxuICAnZmVNZXJnZScsXG4gICdmZU1lcmdlTm9kZScsXG4gICdmZU1vcnBob2xvZ3knLFxuICAnZmVPZmZzZXQnLFxuICAnZmVQb2ludExpZ2h0JyxcbiAgJ2ZlU3BlY3VsYXJMaWdodGluZycsXG4gICdmZVNwb3RMaWdodCcsXG4gICdmZVRpbGUnLFxuICAnZmVUdXJidWxlbmNlJyxcbiAgJ2ZvcmVpZ25PYmplY3QnLFxuICAnZ2x5cGhSZWYnLFxuICAnbGluZWFyR3JhZGllbnQnLFxuICAncmFkaWFsR3JhZGllbnQnLFxuICAnc29saWRDb2xvcicsXG4gICd0ZXh0QXJlYScsXG4gICd0ZXh0UGF0aCdcbl1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js\n");

/***/ })

};
;