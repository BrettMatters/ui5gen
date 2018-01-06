# ui5gen
NodeJs code generator for SAP UI5 framework

# help
Usage: generator [options] [command]

  Options:
    -h, --help  output usage information
    
  Commands:
    controller|c [options] <namespace> [parentController]  Creates a controller
    view [namespace]                                       Creates a view
    
# controller | c
 Usage: controller|c [options] <namespace> [parentController]
  Creates a controller
  
  Options:

    -v, --validator  Create and link a validator
    --no-tests       No jasmine test spec (default: true)
    --test           Test mode, no files created
    -h, --help       output usage information
