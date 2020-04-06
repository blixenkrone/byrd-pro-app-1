import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { IStoryFile, parseFileSuffix } from '../upload.types';
import { StepperService } from 'src/app/shared/shared.service';
import { EMediaFormats, EMediaType } from 'src/app/core/models/media.model';
import { LoaderService } from 'src/app/core/load.service';
import { HttpRequest } from '@angular/common/http';
import { UploadService } from '../upload.service';


@Component({
	selector: 'app-dropzone',
	templateUrl: './dropzone.component.html',
	styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {

	// @Output() readonly outputFiles = new EventEmitter<IStoryFile[]>();
	// @Output() readonly outputType = new EventEmitter<EMediaType>();
	@Input() isWait!: boolean;
	@Input() existingData: IStoryFile[] = [];
	// private mediaType!: EMediaType;
	private maxImagesAllowed = 5;
	private readonly allowedImgExts = ['jpeg', 'jpg', 'png', 'binary', 'x-adobe-dng']
	private readonly allowedVideoExts = ['mp4', 'mov', 'mpeg', 'avi', 'flv', 'm4v']
	private readonly maxFileSize: number = 200;

	@ViewChildren('dropZone') dropZone!: QueryList<any>;

	constructor(
		private _uploadService: UploadService,
		private _loadService: LoaderService) { }

	isWait$ = this._loadService.isWait$

	public onFileOver(event: Event) {
		event.preventDefault()
	}

	public onFileLeave(event: Event) {
		event.stopPropagation()
		event.preventDefault()
	}

	/**
	 * @param inputFiles this is all the files to be run through the machinery
	 * everything starts from here
	 */
	public async onFileDropped(input: NgxFileDropEntry[]): Promise<void> {
		const isMax = this.isMaxFileLength(input.length, this.existingData)
		if (isMax) {
			alert(`Allowed amount of material is 5 for images and 1 for video`)
			return
		}
		for (let i = 0; i < input.length; i++) {
			try {
				const file = await this.getFileEntry(input[i])
				const { exceeds, err } = this.fileSizeExceeded(file)
				if (exceeds || err) {
					alert(`File ${file.name} exceeds file size requirement. error: ${err}`)
					return
				}
				// ? check if valid file and supported format
				const { suffix } = parseFileSuffix(file.name)
				const { ok, mediaType } = this.validFileMediaType(suffix)
				if (typeof mediaType !== 'string') {
					if (!ok && mediaType instanceof Error) {
						alert(mediaType)
						return
					}
					alert(`File format ${mediaType} is not allowed`)
					return
				}
				// this.mediaType = mediaType;

				if (!this.isConsistentMediaTypes(mediaType, ...this.existingData)) {
					console.log(mediaType)
					console.log(this.existingData)
					alert(`It's not allowed to combine images and video`)
					return
				}
				// this.mediaType = mediaType
				// * If all checks were successfull:
				const story: IStoryFile = { file, type: mediaType };
				this.existingData = [...this.existingData, story];
			} catch (e) {
				console.error(e)
				alert(e)
				return
			}
		}
		// After loop, emit those files
		this._uploadService.nextFilesUploadsArray(this.existingData)
	}


	isMaxFileLength = (addLength: number, existingData: IStoryFile[]): boolean => {
		console.log(addLength)
		console.log(existingData.length)
		// if (existingData.length >= this.maxImagesAllowed) return { isMax: true, allowedLength: this.maxImagesAllowed };
		const mType = existingData.map(v => v.type)[0]
		switch (mType) {
			case EMediaType.image:
				return addLength + existingData.length > this.maxImagesAllowed;
			case EMediaType.video:
				return addLength + existingData.length > 1;
			default:
				return false
		}
		// if (existingData.length === 0) { this }
	}

	// processes if the existing/previus media type (ie. video/image) is consistent with the new file(s).
	private isConsistentMediaTypes(next: EMediaType, ...existing: IStoryFile[]) {
		if (existing.length > 0) {
			if (existing.some(sf => sf.type === next)) {
				return true
			}
			return false
		}
		return true
	}

	// Returns promise resolved if file was fetched and stored to sandbox
	private getFileEntry = (inputFile: NgxFileDropEntry): Promise<File> => {
		return new Promise((resolve, reject) => {
			if (inputFile.fileEntry.isFile) {
				const fileEntry = inputFile.fileEntry as FileSystemFileEntry;
				fileEntry.file((f: File) => {
					if (!f) reject('Could not find file entry')
					resolve(f);
				});
			} else {
				reject('Not a file')
			}
		})
	}

	private fileSizeExceeded = (f: File): { exceeds: boolean, err: Error | null } => {
		if (f && f.size > 0) {
			return { exceeds: (f.size >> 20) * 0.045 > this.maxFileSize, err: null }
		} else {
			return { exceeds: false, err: Error('No file size determined') }
		}
	}



	private validFileMediaType(fileExtension: string): { ok: boolean, mediaType: EMediaType | Error } {
		fileExtension = fileExtension.toLowerCase()
		const allowedFormats = [...this.allowedImgExts, ...this.allowedVideoExts];
		for (let i = allowedFormats.length; i >= 0; i--) {
			if (allowedFormats.indexOf(fileExtension) !== -1) {
				if (this.allowedImgExts[i] === fileExtension) {
					// console.log({ ok: true, mediaType: 'image' })
					return { ok: true, mediaType: EMediaType.image }
				} else if (this.allowedVideoExts[i] === fileExtension) {
					// console.log({ ok: true, mediaType: 'video' })
					return { ok: true, mediaType: EMediaType.video }
				}
				if (fileExtension === this.allowedImgExts[i] && fileExtension === this.allowedVideoExts[i]) {
					// ? this doesnt work as intended
					console.error('error double ext')
					return { ok: false, mediaType: Error('Error mixing images and videos') }
				}
			}
		}
		return { ok: false, mediaType: Error(`Format '${fileExtension}' is not an allowed or recognized format`) }
	}

	resetFiles(event: any) {
		// todo: snackbar not
		// this.outputFiles.emit([])
		this.existingData = [];
		this._uploadService.nextFilesUploadsArray(this.existingData)
	}

	// DOM upload dump click evt to open file browser
	zoneClicked(c: ElementRef | any) {
		(c.fileSelector.nativeElement as HTMLInputElement).click();
	}

}
