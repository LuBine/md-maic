import * as qoe from './work';
import * as oe from './interface';

export class SecureFilePipelineFactory implements oe.DataPipelineFactory {
    createInputHandler(): oe.InputHandler {
      return new qoe.FileInputHandler();
    }
  
    createStorageHandler(): oe.StorageHandler {
      return new qoe.DatabaseStorageHandler();
    }
  
    createProcessor(): oe.Processor {
      return new qoe.EncryptionProcessor();
    }
  
    createOutputHandler(): oe.OutputHandler {
      return new qoe.ConsoleOutputHandler();
    }
}

export class NetworkFormatPipelineFactory implements oe.DataPipelineFactory {
    createInputHandler(): oe.InputHandler {
      return new qoe.NetworkInputHandler();
    }
  
    createStorageHandler(): oe.StorageHandler {
      return new qoe.MemoryStorageHandler();
    }
  
    createProcessor(): oe.Processor {
      return new qoe.FormatProcessor();
    }
  
    createOutputHandler(): oe.OutputHandler {
      return new qoe.FileOutputHandler();
    }
  }