export class Pagination {
    private static readonly DEFAULT_PAGE_SIZE = 25;
    public page : number = 1;
    public pageSize: number = Pagination.DEFAULT_PAGE_SIZE;
    public search: string = '';
    public filter: string = '';
    public totalSize: number = 0;
}