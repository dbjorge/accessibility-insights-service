// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as fnv1a from '@sindresorhus/fnv1a';
import { injectable } from 'inversify';
import * as sha256 from 'sha.js';

@injectable()
export class HashGenerator {
    public constructor(private readonly sha: typeof sha256 = sha256) {}

    public generateBase64Hash(...values: string[]): string {
        const hashSeed: string = values.join('|').toLowerCase();

        return this.sha('sha256')
            .update(hashSeed)
            .digest('hex');
    }

    public getPageScanResultDocumentId(baseUrl: string, url: string, runTimeValue: number): string {
        // preserve parameters order for the hash compatibility
        return this.generateBase64Hash(baseUrl, url, runTimeValue.toString());
    }

    public getScanResultDocumentId(scanUrl: string, selector: string, html: string, resultId: string): string {
        // preserve parameters order for the hash compatibility
        return this.generateBase64Hash(scanUrl, selector, html, resultId);
    }

    public getWebsiteDocumentId(baseUrl: string): string {
        // preserve parameters order for the hash compatibility
        return this.generateBase64Hash(baseUrl);
    }

    public getWebsitePageDocumentId(baseUrl: string, url: string): string {
        // preserve parameters order for the hash compatibility
        return this.generateBase64Hash(baseUrl, url);
    }

    public getHashBucket(prefix: string, bucketRange: number, ...values: string[]): string {
        const hashSeed: string = values.join('|').toLowerCase();
        let hash = fnv1a(hashSeed);
        hash = hash <= Number.MIN_VALUE ? hash + 1 : hash;
        const bucket = hash % bucketRange;

        return `${prefix}-${bucket}`;
    }
}
