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
- paginatorText: ww-text - Text component for page numbers
- paginatorPrev: ww-icon - Previous navigation button. Default: {isWwObject:true,type:'ww-icon',content:{icon:'fas fa-angle-left'}}
- paginatorNext: ww-icon - Next navigation button. Default: {isWwObject:true,type:'ww-icon',content:{icon:'fas fa-angle-right'}}

Features:
- Supports custom pagination or collection-based pagination
- Emits change event on page changes
- Auto-generates navigation links with ellipsis

Events:
- change: Triggered when page changes
  Payload: {context: {page: number, offset: number, limit: number, total: number}}
  Description: Provides information about the new page state including page number, offset, items per page and total items

Variables: none
