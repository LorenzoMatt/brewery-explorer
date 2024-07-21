import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
    @Input() page = 1;
    @Input() pageSize = 10;
    @Input() hasMore = false;
    @Output() pageChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();

    onPrevious() {
        if (this.page > 1) {
            this.page -= 1;
            this.pageChange.emit(this.page);
        }
    }

    onNext() {
        if (this.hasMore) {
            this.page += 1;
            this.pageChange.emit(this.page);
        }
    }

    onPageSizeChange(event: Event) {
        const { value } = event.target as HTMLSelectElement;
        this.pageSize = Number(value);
        this.pageSizeChange.emit(this.pageSize);
    }
}
