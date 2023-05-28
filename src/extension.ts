// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


async function runServer() {
  const packageJsonUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, 'package.json');
  const packageJson = JSON.parse((await vscode.workspace.fs.readFile(packageJsonUri)).toString());
	if(packageJson.scripts) {
		const startScript = packageJson.scripts.dev;
  		if (startScript) {
    	const terminal = vscode.window.createTerminal();
    	terminal.sendText(`npx ${startScript}`);
    	terminal.show();
  	}	
		else {
    	vscode.window.showErrorMessage('No "dev" script defined in package.json.Make sure you give the script name as "dev"');
  		}
	}
}

async function runTest() {
	const packageJsonUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, 'package.json');
  	const packageJson = JSON.parse((await vscode.workspace.fs.readFile(packageJsonUri)).toString());
	if(packageJson.scripts) {
		const testScript = packageJson.scripts.test;
  		if (testScript) {
    	const terminal = vscode.window.createTerminal();
    	terminal.sendText(`npx ${testScript}`);
    	terminal.show();
  	}	
		else {
    	vscode.window.showErrorMessage('No "test" script defined in package.json.Make sure you give the script name as "test"');
  		}
	}
}

function stopServer() {
  vscode.commands.executeCommand('workbench.action.terminal.sendSequence', {
    text: '\x03' // Send Ctrl+C command
  });
}




// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sts-touchbar" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sts-touchbar.startVscodeTouchbar', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('VsCode touchbar extension activated!');
	});

	context.subscriptions.push(disposable, vscode.commands.registerCommand('extension.runServer', runServer, vscode.commands.registerCommand('extension.stopServer', stopServer, vscode.commands.registerCommand('extension.runTest', runTest))));
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
