export default {
    editor: {
        label: {
            en: 'Paginator',
            fr: 'Paginateur',
        },
        icon: 'fontawesome/solid/ellipsis-h',
        bubble: {
            icon: 'fontawesome/solid/ellipsis-h',
        },
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { context: {} } }],
    properties: {
        useCustomPagination: {
            label: {
                en: 'Custom pagination',
                fr: 'Pagination personnalisée',
            },
            type: 'OnOff',
            defaultValue: false,
        },
        collectionId: {
            hidden: content => content.useCustomPagination,
            label: {
                en: 'Collection',
                fr: 'Collection',
            },
            type: 'Collection',
            options: {
                paginated: true,
            },
            defaultValue: null,
        },
        paginatorText: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text' },
        },
        paginatorPrev: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-icon', content: { icon: 'fas fa-angle-left' } },
        },
        paginatorNext: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-icon', content: { icon: 'fas fa-angle-right' } },
        },
        paginatorTotal: {
            hidden: content => !content.useCustomPagination,
            label: { en: 'Total items', fr: 'Total items' },
            type: 'Number',
            defaultValue: 10,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the paginator total items: `10`',
            },
            /* wwEditor:end */
        },
        paginatorLimit: {
            hidden: content => !content.useCustomPagination,
            label: { en: 'Items per page', fr: 'Items per page' },
            type: 'Number',
            defaultValue: 5,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the paginator items per page: `5`',
            },
            /* wwEditor:end */
        },
        paginatorOffset: {
            hidden: content => !content.useCustomPagination,
            label: { en: 'Offset', fr: 'Offset' },
            type: 'Number',
            defaultValue: 0,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the paginator offset: `0`',
            },
            /* wwEditor:end */
        },
    },
};
