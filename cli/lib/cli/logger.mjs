/**
 * CLI logging functions.
 *
 * WPP Research, Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import chalk from 'chalk';
import { table as formatTable } from 'table';
import { stringify as formatCsv } from 'csv-stringify/sync'; // eslint-disable-line import/no-unresolved

export const log = console.log; // eslint-disable-line no-console

export const formats = {
	title: chalk.bold,
	error: chalk.bold.red,
	warning: chalk.bold.keyword( 'orange' ),
	success: chalk.bold.green,
};

export const OUTPUT_FORMAT_TABLE = 'table';
export const OUTPUT_FORMAT_CSV = 'csv';

export function isValidTableFormat( format ) {
	return format === OUTPUT_FORMAT_TABLE || format === OUTPUT_FORMAT_CSV;
}

export function table( headings, data, format, rowsAsColumns ) {
	const tableData = [];

	if ( rowsAsColumns ) {
		headings.forEach( ( heading ) => {
			tableData.push( [ heading ] );
		} );
		data.forEach( ( row ) => {
			if ( row.length !== headings.length ) {
				throw new Error( 'Invalid table data.' );
			}
			row.forEach( ( value, index ) => {
				tableData[ index ].push( value );
			} );
		} );
	} else {
		tableData.push( headings );
		data.forEach( ( row ) => {
			if ( row.length !== headings.length ) {
				throw new Error( 'Invalid table data.' );
			}
			tableData.push( row );
		} );
	}

	if ( format === OUTPUT_FORMAT_CSV ) {
		return formatCsv( tableData );
	}

	return formatTable( tableData );
}
