// * Initial state interface for ERP Config Properties
export interface ERPConfigPropertiesProps {
    clientCertExpanded: boolean;
    commonExpanded: boolean;
    inputExpanded: boolean;
    miscExpanded: boolean;
    oauth1Expanded: boolean;
    oauth2Expanded: boolean;
    optionsExpanded: boolean;
    outputExpanded: boolean;
    simpleAuthExpanded: boolean;
}

// * Initial expanded state for ERP Config Properties
export const initialExpandedParameters: ERPConfigPropertiesProps = {
    clientCertExpanded: false,
    commonExpanded: false,
    inputExpanded: false,
    miscExpanded: false,
    oauth1Expanded: false,
    oauth2Expanded: false,
    optionsExpanded: false,
    outputExpanded: false,
    simpleAuthExpanded: false
}

// * Initial state interface for ERP Config Properties
export interface ClientCertificateStates {
    clientCertFile: string;
    clientCertPass: string;
    enableSSLValidation: boolean;
    secureClientPassword: string;
}

// * Initial state for Client Certificate Properties
export const initialClientCertificateStates: ClientCertificateStates = {
    clientCertFile: '',
    clientCertPass: '',
    enableSSLValidation: false,
    secureClientPassword: ''
};

// * Initial state interface for Common Properties
export interface CommonStates {
    continueOnError: boolean;
    callGetMethod: string;
    timeout: string;
}

// * Initial state for Common Properties
export const initialCommonStates: CommonStates = {
    continueOnError: false,
    callGetMethod: '',
    timeout: '6000'
};

// * Initial state interface for Input Properties
export interface InputStates {
    acceptFormat: string;
    requestMethod: string;
    requestUrl: string;
}

// * Initial state for Input Properties
export const initialInputStates: InputStates = {
    acceptFormat: '',
    requestMethod: 'GET',
    requestUrl: ''
};

// * Initial state interface for OAuth1 Properties
export interface OAuth1States {
    oauth1Consumer: string;
    oauth1ConsumerSecret: string;
    oauth1Token: string;
    oauth1TokenSecret: string;
}

// * Initial state for OAuth1 Properties
export const initialOAuth1States: OAuth1States = {
    oauth1Consumer: '',
    oauth1ConsumerSecret: '',
    oauth1Token: '',
    oauth1TokenSecret: ''
};

// * Initial state interface for OAuth2 Properties
export interface OAuth2States {
    oauth2Token: string;
    oauth2TokenSecret: string;
}

// * Initial state for OAuth2 Properties
export const initialOAuth2States: OAuth2States = {
    oauth2Token: '',
    oauth2TokenSecret: ''
};

// * Initial state interface for Options Properties
export interface OptionsStates {
    body: string;
    bodyFormat: string;
    fileAttachments: string;
    fileAttachmentName: string;
    attachments: Array<Parameter> | null;
    cookies: Array<Parameter> | null;
    header: Array<Parameter> | null;
    parameters: Array<Parameter> | null;
    urlSegments: Array<Parameter> | null;
}

// * Options Parameter States
export interface Parameter {
    id: string;
    name: string;
    value: string;
}

// * Initial state for Options Properties
export const initialOptionsStates: OptionsStates = {
    body: '',
    bodyFormat: '',
    fileAttachments: '',
    fileAttachmentName: '',
    attachments: null,
    cookies: null,
    header: null,
    parameters: null,
    urlSegments: null
};

// * Initial state interface for Output Properties
export interface OutputStates {
    outputHeaders: string;
    responseAttachment: string;
    responseContent: string;
    responseStatus: string;
}

// * Initial state for Output Properties
export const initialOutputStates: OutputStates = {
    outputHeaders: '',
    responseAttachment: '',
    responseContent: '',
    responseStatus: ''
};

// * Initial state interface for Simple Auth Properties
export interface SimpleAuthStates {
    simplePassword: string;
    securePassword: string;
    simpleUsername: string;
}

// * Initial state for Simple Auth Properties
export const initialSimpleAuthStates: SimpleAuthStates = {
    simplePassword: '',
    securePassword: '',
    simpleUsername: ''
};
