coveops-cli-plugin
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/coveops-cli-plugin.svg)](https://npmjs.org/package/coveops-cli-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/coveops-cli-plugin.svg)](https://npmjs.org/package/coveops-cli-plugin)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g coveops-cli-plugin
$ coveops COMMAND
running command...
$ coveops (--version)
coveops-cli-plugin/0.5.0 darwin-arm64 node-v22.1.0
$ coveops --help [COMMAND]
USAGE
  $ coveops COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`coveops hello PERSON`](#coveops-hello-person)
* [`coveops hello world`](#coveops-hello-world)
* [`coveops help [COMMAND]`](#coveops-help-command)
* [`coveops org commerce listings create`](#coveops-org-commerce-listings-create)
* [`coveops org commerce listings delete`](#coveops-org-commerce-listings-delete)
* [`coveops org commerce listings get`](#coveops-org-commerce-listings-get)
* [`coveops org commerce listings global get`](#coveops-org-commerce-listings-global-get)
* [`coveops org commerce listings global update`](#coveops-org-commerce-listings-global-update)
* [`coveops org commerce listings list`](#coveops-org-commerce-listings-list)
* [`coveops org commerce listings update NAME`](#coveops-org-commerce-listings-update-name)
* [`coveops org search authentication create NAME`](#coveops-org-search-authentication-create-name)
* [`coveops org search authentication delete ID`](#coveops-org-search-authentication-delete-id)
* [`coveops org search authentication list`](#coveops-org-search-authentication-list)
* [`coveops org search authentication update ID`](#coveops-org-search-authentication-update-id)
* [`coveops org vaults create`](#coveops-org-vaults-create)
* [`coveops org vaults list`](#coveops-org-vaults-list)
* [`coveops plugins`](#coveops-plugins)
* [`coveops plugins add PLUGIN`](#coveops-plugins-add-plugin)
* [`coveops plugins:inspect PLUGIN...`](#coveops-pluginsinspect-plugin)
* [`coveops plugins install PLUGIN`](#coveops-plugins-install-plugin)
* [`coveops plugins link PATH`](#coveops-plugins-link-path)
* [`coveops plugins remove [PLUGIN]`](#coveops-plugins-remove-plugin)
* [`coveops plugins reset`](#coveops-plugins-reset)
* [`coveops plugins uninstall [PLUGIN]`](#coveops-plugins-uninstall-plugin)
* [`coveops plugins unlink [PLUGIN]`](#coveops-plugins-unlink-plugin)
* [`coveops plugins update`](#coveops-plugins-update)

## `coveops hello PERSON`

Say hello

```
USAGE
  $ coveops hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ coveops hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/hello/index.ts)_

## `coveops hello world`

Say hello world

```
USAGE
  $ coveops hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ coveops hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/hello/world.ts)_

## `coveops help [COMMAND]`

Display help for coveops.

```
USAGE
  $ coveops help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for coveops.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.20/src/commands/help.ts)_

## `coveops org commerce listings create`

Create a new listing configuration in the organization

```
USAGE
  $ coveops org commerce listings create -i <value> -d <value> -f <value> -n <value>

FLAGS
  -d, --displayName=<value>  (required) Display name of the listing configuration
  -f, --filter=<value>       (required) Filter query for the listing configuration
  -i, --configFile=<value>   (required) Path to JSON file containing the full listing configuration
  -n, --name=<value>         (required) Name of the listing configuration

DESCRIPTION
  Create a new listing configuration in the organization

EXAMPLES
  $ coveops org commerce listings create --name "electronics" --displayName "Electronics" --filter "@category==electronics" --catalogId "default"
```

_See code: [src/commands/org/commerce/listings/create.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/create.ts)_

## `coveops org commerce listings delete`

Delete a listing configuration in an organization

```
USAGE
  $ coveops org commerce listings delete -c <value>

FLAGS
  -c, --configId=<value>  (required) The unique identifier of the listing configuration.

DESCRIPTION
  Delete a listing configuration in an organization

EXAMPLES
  $ coveops org commerce listings delete --catalogId default
```

_See code: [src/commands/org/commerce/listings/delete.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/delete.ts)_

## `coveops org commerce listings get`

Get a specific listing configuration

```
USAGE
  $ coveops org commerce listings get -c <value> [--json]

FLAGS
  -c, --configId=<value>  (required) The unique identifier of the listing configuration.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Get a specific listing configuration

EXAMPLES
  $ coveops org commerce listings get --configId default
```

_See code: [src/commands/org/commerce/listings/get.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/get.ts)_

## `coveops org commerce listings global get`

Get the global listing configuration for a catalog

```
USAGE
  $ coveops org commerce listings global get -t <value>

FLAGS
  -t, --trackingId=<value>  (required) The unique identifier of the tracking target.

DESCRIPTION
  Get the global listing configuration for a catalog

EXAMPLES
  $ coveops org commerce listings global get --trackingId my-tracking-id
```

_See code: [src/commands/org/commerce/listings/global/get.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/global/get.ts)_

## `coveops org commerce listings global update`

Update the global listing configuration

```
USAGE
  $ coveops org commerce listings global update -i <value>

FLAGS
  -i, --configFile=<value>  (required) Path to JSON file containing the global listing configuration

DESCRIPTION
  Update the global listing configuration

EXAMPLES
  $ coveops org commerce listings global update --configFile path/to/config.json
```

_See code: [src/commands/org/commerce/listings/global/update.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/global/update.ts)_

## `coveops org commerce listings list`

List all listing configurations of an organization

```
USAGE
  $ coveops org commerce listings list -t <value> [--json] [-p <value>] [-P <value>]

FLAGS
  -P, --perPage=<value>     [default: 10] The number of items per page.
  -p, --page=<value>        The page number to retrieve.
  -t, --trackingId=<value>  (required) The unique identifier of the tracking target.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all listing configurations of an organization

EXAMPLES
  $ coveops org commerce listings list --trackingId my-tracking-id

  $ coveops org commerce listings list --trackingId my-tracking-id --page 1 --perPage 20
```

_See code: [src/commands/org/commerce/listings/list.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/list.ts)_

## `coveops org commerce listings update NAME`

Update a specific listing configuration

```
USAGE
  $ coveops org commerce listings update NAME -c <value> [-i <value>] [-d <value>] [-f <value>] [-a]

ARGUMENTS
  NAME  Name of the listing configuration to update

FLAGS
  -a, --isActive             Set the active status of the listing configuration
  -c, --configId=<value>     (required) The unique identifier of the listing configuration.
  -d, --displayName=<value>  New display name for the listing configuration
  -f, --filter=<value>       New filter query for the listing configuration
  -i, --configFile=<value>   Path to JSON file containing the full listing configuration

DESCRIPTION
  Update a specific listing configuration

EXAMPLES
  $ coveops org commerce listings update electronics --displayName "Electronics Updated" --configId default

  $ coveops org commerce listings update electronics --configFile path/to/config.json --configId default
```

_See code: [src/commands/org/commerce/listings/update.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/commerce/listings/update.ts)_

## `coveops org search authentication create NAME`

Create a new Authentication provider (SAML or Sharepoint Claims) in the specified organization

```
USAGE
  $ coveops org search authentication create NAME -r <value> [-a <value>] [-f] [-e <value>] [-m <value>] [-p <value>] [-s <value>] [-t
    saml|sharepoint] [-u <value>]

ARGUMENTS
  NAME  Name for the authentication provider

FLAGS
  -a, --assertionConsumerServiceUrl=<value>  Assertion Consumer Service URL for the authentication provider
  -e, --expiration=<value>                   Expiration time for the authentication provider
  -f, --enforceTrustedUris                   Enforce trusted URIs
  -m, --metadataUrl=<value>                  Metadata URL for the authentication provider
  -p, --provider=<value>                     [default: Email Security Provider] Desired Security Provider for the
                                             authentication provider
  -r, --relyingPartyIdentifier=<value>       (required) [default: https://platform.cloud.coveo.com] Relying Party
                                             Identifier for the authentication provider
  -s, --secret=<value>                       Secret for the authentication provider
  -t, --type=<option>                        [default: saml] Type of authentication provider to list
                                             <options: saml|sharepoint>
  -u, --uri=<value>                          URI for the Sharepoint Claims authentication provider

DESCRIPTION
  Create a new Authentication provider (SAML or Sharepoint Claims) in the specified organization

EXAMPLES
  $ coveops org search authentication create --type saml "My SAML Provider" --metadataUrl "https://example.com/metadata.xml"
```

_See code: [src/commands/org/search/authentication/create.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/search/authentication/create.ts)_

## `coveops org search authentication delete ID`

Deletes an existing Authentication provider (SAML or Sharepoint Claims) in the specified organization

```
USAGE
  $ coveops org search authentication delete ID [-t saml|sharepoint]

ARGUMENTS
  ID  Id of the authentication provider to delete

FLAGS
  -t, --type=<option>  Type of authentication provider to list
                       <options: saml|sharepoint>

DESCRIPTION
  Deletes an existing Authentication provider (SAML or Sharepoint Claims) in the specified organization

EXAMPLES
  $ coveops org search authentication delete 73404dc5-1111-1111-1111-0e5144482521
```

_See code: [src/commands/org/search/authentication/delete.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/search/authentication/delete.ts)_

## `coveops org search authentication list`

List all authentication providers for an organization

```
USAGE
  $ coveops org search authentication list [--json] [-f] [-t saml|sharepoint]

FLAGS
  -f, --force
  -t, --type=<option>  Type of authentication provider to list
                       <options: saml|sharepoint>

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all authentication providers for an organization

EXAMPLES
  $ coveops org search authentication list
```

_See code: [src/commands/org/search/authentication/list.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/search/authentication/list.ts)_

## `coveops org search authentication update ID`

Updates an existing Authentication provider (SAML or Sharepoint Claims) in the specified organization

```
USAGE
  $ coveops org search authentication update ID -n <value> -r <value> [-a <value>] [-f] [-e <value>] [-m <value>] [-p <value>] [-s
    <value>] [-t saml|sharepoint] [-u <value>]

ARGUMENTS
  ID  Id of the authentication provider to update

FLAGS
  -a, --assertionConsumerServiceUrl=<value>  Assertion Consumer Service URL for the authentication provider
  -e, --expiration=<value>                   Expiration time for the authentication provider
  -f, --enforceTrustedUris                   Enforce trusted URIs
  -m, --metadataUrl=<value>                  Metadata URL for the authentication provider
  -n, --name=<value>                         (required) Name of the authentication provider
  -p, --provider=<value>                     [default: Email Security Provider] Desired Security Provider for the
                                             authentication provider
  -r, --relyingPartyIdentifier=<value>       (required) [default: https://platform.cloud.coveo.com] Relying Party
                                             Identifier for the authentication provider
  -s, --secret=<value>                       Secret for the authentication provider
  -t, --type=<option>                        [default: saml] Type of authentication provider to list
                                             <options: saml|sharepoint>
  -u, --uri=<value>                          URI for the Sharepoint Claims authentication provider

DESCRIPTION
  Updates an existing Authentication provider (SAML or Sharepoint Claims) in the specified organization

EXAMPLES
  $ coveops org search authentication update --type saml 73404dc5-1111-1111-1111-0e5144482521 --relyingPartyIdentifier https://platform-ca.cloud.coveo.com
```

_See code: [src/commands/org/search/authentication/update.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/search/authentication/update.ts)_

## `coveops org vaults create`

Create a new Vault parameter in the specified organization

```
USAGE
  $ coveops org vaults create -n <value> -v <value> [-r EXTENSION|SOURCE -s <value>...] [-t PUBLIC|OBFUSCATED|STRICT]

FLAGS
  -n, --key=<value>            (required) Key for the Vault parameter
  -r, --resourceType=<option>  [default: EXTENSION] Resource type for Scope of the Vault parameter
                               <options: EXTENSION|SOURCE>
  -s, --scope=<value>...       Scope for the Vault parameter
  -t, --visibility=<option>    [default: OBFUSCATED] Visibility type (PUBLIC, OBFUSCATED, or STRICT)
                               <options: PUBLIC|OBFUSCATED|STRICT>
  -v, --value=<value>          (required) Value for the Vault parameter

DESCRIPTION
  Create a new Vault parameter in the specified organization
```

_See code: [src/commands/org/vaults/create.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/vaults/create.ts)_

## `coveops org vaults list`

List all Vault parameters in the specified organization

```
USAGE
  $ coveops org vaults list [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List all Vault parameters in the specified organization

EXAMPLES
  coveo org:vaults:list
```

_See code: [src/commands/org/vaults/list.ts](https://github.com/Coveo-Turbo/coveops-cli-plugin/blob/v0.5.0/src/commands/org/vaults/list.ts)_

## `coveops plugins`

List installed plugins.

```
USAGE
  $ coveops plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ coveops plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/index.ts)_

## `coveops plugins add PLUGIN`

Installs a plugin into coveops.

```
USAGE
  $ coveops plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into coveops.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the COVEOPS_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the COVEOPS_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ coveops plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ coveops plugins add myplugin

  Install a plugin from a github url.

    $ coveops plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ coveops plugins add someuser/someplugin
```

## `coveops plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ coveops plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ coveops plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/inspect.ts)_

## `coveops plugins install PLUGIN`

Installs a plugin into coveops.

```
USAGE
  $ coveops plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into coveops.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the COVEOPS_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the COVEOPS_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ coveops plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ coveops plugins install myplugin

  Install a plugin from a github url.

    $ coveops plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ coveops plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/install.ts)_

## `coveops plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ coveops plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ coveops plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/link.ts)_

## `coveops plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ coveops plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ coveops plugins unlink
  $ coveops plugins remove

EXAMPLES
  $ coveops plugins remove myplugin
```

## `coveops plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ coveops plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/reset.ts)_

## `coveops plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ coveops plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ coveops plugins unlink
  $ coveops plugins remove

EXAMPLES
  $ coveops plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/uninstall.ts)_

## `coveops plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ coveops plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ coveops plugins unlink
  $ coveops plugins remove

EXAMPLES
  $ coveops plugins unlink myplugin
```

## `coveops plugins update`

Update installed plugins.

```
USAGE
  $ coveops plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.24/src/commands/plugins/update.ts)_
<!-- commandsstop -->
