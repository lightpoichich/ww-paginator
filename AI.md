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
- useCustomPagination: boolean - Enable custom pagination settings. Default: false
- collectionId: string|null - Collection ID for pagination. Default: null
- paginatorTotal: number - Total items for custom pagination. Default: 10
- paginatorLimit: number - Items per page. Default: 5
- paginatorOffset: number - Starting index of current page. Default: 0

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
{"uid":"styled_paginator","tag":"ww-paginator","name":"Styled Paginator","props":{"default":{"useCustomPagination":true,"paginatorTotal":10,"paginatorLimit":2,"paginatorOffset":6}},"styles":{"default":{"marginTop":"24px","padding":"16px","backgroundColor":"#FFFFFF","borderRadius":"8px","boxShadow":"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"}},"children":{"paginatorPrev":{"uid":"styled_prev_icon"},"paginatorNext":{"uid":"styled_next_icon"},"paginatorText":{"uid":"styled_page_text"}}}
{"uid":"styled_prev_icon","tag":"ww-icon","name":"Styled Previous Icon","props":{"default":{"icon":"fas fa-arrow-left","color":"#3B82F6","fontSize":16}},"styles":{"default":{"cursor":"pointer","padding":"8px","marginRight":"6px","borderRadius":"6px","backgroundColor":"#EFF6FF","transition":"all 0.2s ease"},"_wwHover_default":{"backgroundColor":"#DBEAFE"}}}
{"uid":"styled_next_icon","tag":"ww-icon","name":"Styled Next Icon","props":{"default":{"icon":"fas fa-arrow-right","color":"#3B82F6","fontSize":16}},"styles":{"default":{"cursor":"pointer","padding":"8px","marginLeft":"6px","borderRadius":"6px","backgroundColor":"#EFF6FF","transition":"all 0.2s ease"},"_wwHover_default":{"backgroundColor":"#DBEAFE"}}}
{"uid":"styled_page_text","tag":"ww-text","name":"Styled Page Text","props":{"default":{"tag":"p"}},"styles":{"default":{"fontSize":"14px","fontWeight":"500","color":"#1E293B"}}}
</elements>
