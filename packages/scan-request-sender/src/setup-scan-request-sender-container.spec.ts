// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import 'reflect-metadata';

import { StorageClient } from 'azure-services';
import { ServiceConfiguration } from 'common';
import { ScanRequestSender } from './sender/scan-request-sender';
import { setupScanRequestSenderContainer } from './setup-scan-request-sender-container';
// tslint:disable: no-any

describe(setupScanRequestSenderContainer, () => {
    it('verify StorageClient resolution', () => {
        const container = setupScanRequestSenderContainer();

        const storageClient = container.get(StorageClient);

        expect((storageClient as any).dbName).toBe('scanner');
        expect((storageClient as any).collectionName).toBe('a11yIssues');
    });

    it('verify scan request sender dependencies resolution', () => {
        const container = setupScanRequestSenderContainer();
        expect(container.get(ScanRequestSender)).toBeDefined();
    });

    it('resolves singleton dependencies', () => {
        const container = setupScanRequestSenderContainer();
        const serviceConfig = container.get(ServiceConfiguration);

        expect(serviceConfig).toBeInstanceOf(ServiceConfiguration);
        expect(serviceConfig).toBe(container.get(ServiceConfiguration));
    });
});
