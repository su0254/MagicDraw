import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatDialog } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { DrawingDialogComponent } from "./drawing-dialog/drawing-dialog/drawing-dialog.component"
import { ConfirmDialogComponent } from "../../../shareds/confirm-dialog/confirm-dialog/confirm-dialog.component"
// import { DrawingDialogComponent } from "./drawing-dialog/drawing-dialog.component"
// import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component"

export interface Drawing {
  id: number
  title: string
  category: string
  artist: string
  status: string
  uploadDate: string
  views: number
  likes: number
  thumbnailUrl: string
}

@Component({
  selector: "app-drawings",
  templateUrl: "./drawings.component.html",
  styleUrls: ["./drawings.component.css"],
})
export class DrawingsComponent implements OnInit {
  displayedColumns: string[] = [
    "thumbnail",
    "id",
    "title",
    "category",
    "artist",
    "status",
    "uploadDate",
    "views",
    "likes",
    "actions",
  ]
  dataSource = new MatTableDataSource<Drawing>()

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    // Mock data
    const drawings: Drawing[] = [
      {
        id: 1,
        title: "Sunny Day",
        category: "Nature",
        artist: "John Doe",
        status: "Approved",
        uploadDate: "2023-04-10",
        views: 120,
        likes: 45,
        thumbnailUrl: "assets/drawing1.jpg",
      },
      {
        id: 2,
        title: "My Pet Dog",
        category: "Animals",
        artist: "Jane Smith",
        status: "Approved",
        uploadDate: "2023-04-12",
        views: 85,
        likes: 32,
        thumbnailUrl: "assets/drawing2.jpg",
      },
      {
        id: 3,
        title: "Space Adventure",
        category: "Fantasy",
        artist: "Bob Johnson",
        status: "Pending",
        uploadDate: "2023-04-15",
        views: 0,
        likes: 0,
        thumbnailUrl: "assets/drawing3.jpg",
      },
      {
        id: 4,
        title: "Rainbow Castle",
        category: "Fantasy",
        artist: "Alice Brown",
        status: "Approved",
        uploadDate: "2023-04-08",
        views: 210,
        likes: 78,
        thumbnailUrl: "assets/drawing4.jpg",
      },
      {
        id: 5,
        title: "My Family",
        category: "People",
        artist: "Charlie Wilson",
        status: "Approved",
        uploadDate: "2023-04-05",
        views: 150,
        likes: 56,
        thumbnailUrl: "assets/drawing5.jpg",
      },
      {
        id: 6,
        title: "Racing Car",
        category: "Vehicles",
        artist: "Diana Miller",
        status: "Approved",
        uploadDate: "2023-04-11",
        views: 95,
        likes: 41,
        thumbnailUrl: "assets/drawing6.jpg",
      },
      {
        id: 7,
        title: "Underwater World",
        category: "Nature",
        artist: "Edward Davis",
        status: "Rejected",
        uploadDate: "2023-04-14",
        views: 0,
        likes: 0,
        thumbnailUrl: "assets/drawing7.jpg",
      },
      {
        id: 8,
        title: "Dinosaur Park",
        category: "Animals",
        artist: "Fiona Clark",
        status: "Approved",
        uploadDate: "2023-04-09",
        views: 180,
        likes: 67,
        thumbnailUrl: "assets/drawing8.jpg",
      },
      {
        id: 9,
        title: "Rocket Ship",
        category: "Space",
        artist: "George White",
        status: "Approved",
        uploadDate: "2023-04-07",
        views: 135,
        likes: 52,
        thumbnailUrl: "assets/drawing9.jpg",
      },
      {
        id: 10,
        title: "Magical Forest",
        category: "Fantasy",
        artist: "Hannah Lee",
        status: "Pending",
        uploadDate: "2023-04-16",
        views: 0,
        likes: 0,
        thumbnailUrl: "assets/drawing10.jpg",
      },
    ]

    this.dataSource.data = drawings
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  addDrawing() {
    const dialogRef = this.dialog.open(DrawingDialogComponent, {
      width: "500px",
      data: { title: "Add Drawing", drawing: {} },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to add the drawing
        const newDrawing: Drawing = {
          id: this.dataSource.data.length + 1,
          title: result.title,
          category: result.category,
          artist: result.artist,
          status: "Pending",
          uploadDate: new Date().toISOString().split("T")[0],
          views: 0,
          likes: 0,
          thumbnailUrl: result.thumbnailUrl || "assets/placeholder.jpg",
        }

        this.dataSource.data = [...this.dataSource.data, newDrawing]
        this.snackBar.open("Drawing added successfully", "Close", { duration: 3000 })
      }
    })
  }

  editDrawing(drawing: Drawing) {
    const dialogRef = this.dialog.open(DrawingDialogComponent, {
      width: "500px",
      data: { title: "Edit Drawing", drawing: { ...drawing } },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to update the drawing
        const updatedDrawings = this.dataSource.data.map((d) =>
          d.id === drawing.id
            ? {
                ...d,
                title: result.title,
                category: result.category,
                artist: result.artist,
                status: result.status,
              }
            : d,
        )

        this.dataSource.data = updatedDrawings
        this.snackBar.open("Drawing updated successfully", "Close", { duration: 3000 })
      }
    })
  }

  deleteDrawing(drawing: Drawing) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Drawing",
        message: `Are you sure you want to delete "${drawing.title}"?`,
        confirmText: "Delete",
        cancelText: "Cancel",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to delete the drawing
        this.dataSource.data = this.dataSource.data.filter((d) => d.id !== drawing.id)
        this.snackBar.open("Drawing deleted successfully", "Close", { duration: 3000 })
      }
    })
  }
}
