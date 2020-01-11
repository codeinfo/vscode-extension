// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// 注册命令
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);

	// 添加文件目录 右键功能
	context.subscriptions.push(vscode.commands.registerCommand('extension.demo.getCurrentFilePath', (uri) => {
		vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
	}));

	// 编辑器命令
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.testEditorCommand', (textEditor, edit) => {
		console.log('您正在执行编辑器命令！');
		console.log(textEditor, edit);
	}));

	// 获取所有命令
	vscode.commands.getCommands().then(allCommands => {
		console.log('所有命令：', allCommands);
	});
	
	context.subscriptions.push(vscode.commands.registerCommand('extension.demo.openWebview', function (uri) {
    // 创建webview
    const panel = vscode.window.createWebviewPanel(
        'testWebview', // viewType
        "WebView演示", // 视图标题
        vscode.ViewColumn.One, // 显示在编辑器的哪个部位
        {
            enableScripts: true, // 启用JS，默认禁用
            retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        }
    );
		panel.webview.html = `<html><body>你好，我是Webview</body></html>`;
	}));
	
}

// this method is called when your extension is deactivated
/**
 * 插件被释放时触发
 */
export function deactivate() {}
