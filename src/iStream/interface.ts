// 输入接口
export interface InputHandler {
    read(): string;
}

// 存储接口
export interface StorageHandler {
    save(data: string): void;
}

// 处理接口
export interface Processor {
    process(data: string): string;
}

// 输出接口
export interface OutputHandler {
    write(result: string): void;
}

// 定义流过程工厂
export interface DataPipelineFactory {
    createInputHandler(): InputHandler;
    createStorageHandler(): StorageHandler;
    createProcessor(): Processor;
    createOutputHandler(): OutputHandler;
}