---
name: ww-paginator
description: The ww-paginator component provides a pagination control for navigating through multi-page collections, featuring customizable settings, navigation links, and event emission on page changes.
keywords:
  - pagination
  - custom pagination
  - navigation links
  - collection id
  - paginator total
  - paginator limit
  - paginator offset
  - change event
  - ww-icon
  - ww-text
---

#### ww-paginator

Renders a pagination control for navigating through multi-page collections with navigation links.

Properties:
- collectionId: string|null - Collection ID for pagination. Default: null
- useCustomPagination: boolean - Enable custom pagination settings. Default: false
- paginatorTotal: number - Total items for custom pagination. Default: 10
- paginatorLimit: number - Items per page. Default: 5
- paginatorOffset: number - Starting index of current page. Default: 0
Note: There is 2 options :
- Eitheir specify a collection ID, which will automatically compute the pagination. The collection offset will be automatically updated.
- Or you can set useCustomPagination to true and use paginatorTotal / paginatorLimit / paginatorOffset. In this case, you have to to use a wwFormula or wwJavascript to compute the offset, and you need to handle pagination change event using a workflow (see example below).

Children:
- paginatorText: ww-text - Text component for page numbers.
- paginatorPrev: ww-icon - Previous navigation button. Default: {type:'ww-icon',content:{icon:'fas fa-angle-left'}}.
- paginatorNext: ww-icon - Next navigation button. Default: {type:'ww-icon',content:{icon:'fas fa-angle-right'}}

IMPORTANT: Use right margin and left margin for paginatorPrev and paginatorNext to prevent text being glued to the icon.

Features:
- Supports custom pagination or collection-based pagination
- Emits change event on page changes
- Auto-generates navigation links with ellipsis

Events:
- change: Triggered when page changes
  Payload: {context: {page: number, offset: number, limit: number, total: number}}
  Description: Provides information about the new page state including page number, offset, items per page and total items

Example:
<elements>
{"uid":0,"tag":"ww-paginator","name":"Products Paginator","settings":{"workflows":[{"name":"Handle page change","actions":{"action1":{"name":"Update current page","next":null,"type":"variable","varId":"bac853eb-eaf9-40bf-9e43-806e8a65949e","varValue":{"wwJavascript":"return {\n  ...variables['bac853eb-eaf9-40bf-9e43-806e8a65949e'],\n  currentPage: event.context.page,\n}"}}},"trigger":"change","description":"Updates the current page when pagination changes","firstAction":"action1"}]},"props":{"default":{"maxPages":5,"totalItems":{"wwFormula":"variables['bac853eb-eaf9-40bf-9e43-806e8a65949e'].totalItems"},"currentPage":{"wwFormula":"variables['bac853eb-eaf9-40bf-9e43-806e8a65949e'].currentPage"},"itemsPerPage":{"wwFormula":"variables['bac853eb-eaf9-40bf-9e43-806e8a65949e'].itemsPerPage"},"paginatorLimit":{"defaultValue":5,"wwFormula":"variables['bac853eb-eaf9-40bf-9e43-806e8a65949e']?.['itemsPerPage']"},"paginatorTotal":{"defaultValue":10,"wwFormula":"variables['bac853eb-eaf9-40bf-9e43-806e8a65949e']?.['totalItems']"},"paginatorOffset":{"defaultValue":0,"wwJavascript":"const { currentPage, itemsPerPage } = variables['bac853eb-eaf9-40bf-9e43-806e8a65949e'];\n\nreturn (currentPage - 1) * itemsPerPage"},"useCustomPagination":true}},"styles":{"default":{"display":"flex","padding":"8px","boxShadow":"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)","borderRadius":"12px","backgroundColor":"#f8fafc","rowGap":"8px","columnGap":"4px","alignItems":"center"},"children":{"lastButton":{"color":"#64748b","hover":{"backgroundColor":"#e2e8f0"},"cursor":"pointer","height":"40px","display":"flex","disabled":{"color":"#cbd5e1","hover":{"backgroundColor":"transparent"},"cursor":"not-allowed"},"fontSize":"16px","minWidth":"40px","alignItems":"center","transition":"all 0.2s ease","borderRadius":"8px","justifyContent":"center","backgroundColor":"transparent"},"nextButton":{"color":"#64748b","hover":{"backgroundColor":"#e2e8f0"},"cursor":"pointer","height":"40px","display":"flex","disabled":{"color":"#cbd5e1","hover":{},"cursor":"not-allowed"},"fontSize":"16px","minWidth":"40px","alignItems":"center","transition":"all 0.2s ease","borderRadius":"8px","justifyContent":"center","backgroundColor":"transparent"},"pageButton":{"color":"#64748b","hover":{"backgroundColor":"#e2e8f0"},"cursor":"pointer","height":"40px","display":"flex","fontSize":"14px","minWidth":"40px","selected":{"color":"#ffffff","hover":{"backgroundColor":"#2563eb"},"backgroundColor":"#3b82f6"},"alignItems":"center","fontWeight":"500","transition":"all 0.2s ease","borderRadius":"8px","justifyContent":"center","backgroundColor":"transparent"},"firstButton":{"color":"#64748b","hover":{"backgroundColor":"#e2e8f0"},"cursor":"pointer","height":"40px","display":"flex","disabled":{"color":"#cbd5e1","hover":{"backgroundColor":"transparent"},"cursor":"not-allowed"},"fontSize":"16px","minWidth":"40px","alignItems":"center","transition":"all 0.2s ease","borderRadius":"8px","justifyContent":"center","backgroundColor":"transparent"},"previousButton":{"color":"#64748b","hover":{"backgroundColor":"#e2e8f0"},"cursor":"pointer","height":"40px","display":"flex","disabled":{"color":"#cbd5e1","hover":{"backgroundColor":"transparent"},"cursor":"not-allowed"},"fontSize":"16px","minWidth":"40px","alignItems":"center","transition":"all 0.2s ease","borderRadius":"8px","justifyContent":"center","backgroundColor":"transparent"}}},"children":{"paginatorNext":{"uid":1},"paginatorPrev":{"uid":2},"paginatorText":{"uid":3}}}
{"uid":1,"tag":"ww-icon","props":{"default":{"icon":"fas fa-chevron-right","color":"#64748b","fontSize":"14"}}}
{"uid":2,"tag":"ww-icon","props":{"default":{"icon":"fas fa-chevron-left","color":"#64748b","fontSize":"14"}}}
{"uid":3,"tag":"ww-text","props":{"default":{"tag":"p","text":"New text"}},"styles":{"default":{"margin":"0 8px","color":"#64748b","fontSize":"14px","fontWeight":{"defaultValue":"500","wwJavascript":"return context.item.index+1 === variables['bac853eb-eaf9-40bf-9e43-806e8a65949e']?.['currentPage'] ? 'bold' : undefined"}}}}
</elements>
