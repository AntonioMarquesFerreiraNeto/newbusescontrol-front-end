export class Pagination {
    public static readonly DEFAULT_PAGE_SIZE = 25;
    public static readonly DEFAULT_PAGE_SIZE_TICKETS = 15;

    public page : number = 1;
    public pageSize: number = Pagination.DEFAULT_PAGE_SIZE;
    public search: string = '';
    public filter: string = '';
    public totalSize: number = 0;
}