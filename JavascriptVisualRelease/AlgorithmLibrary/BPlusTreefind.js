// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco

var FIRST_PRINT_POS_X = 50;
var PRINT_VERTICAL_GAP = 20;
var PRINT_MAX = 990;
var PRINT_HORIZONTAL_GAP = 50;

var MIN_MAX_DEGREE = 4;
var MAX_MAX_DEGREE = 4;

var HEIGHT_DELTA  = 50;
var NODE_SPACING = 50; 
var STARTING_Y = 30;
var WIDTH_PER_ELEM = 100;
var NODE_HEIGHT = 20;

var MESSAGE_X = 5;
var MESSAGE_Y = 10;

var LINK_COLOR = "#007700";
var HIGHLIGHT_CIRCLE_COLOR = "#007700";
var FOREGROUND_COLOR = "#007700";
var BACKGROUND_COLOR = "#EEFFEE";
var PRINT_COLOR = FOREGROUND_COLOR;



function BPlusTree(am, w, h)
{
	this.init(am, w, h);

}

BPlusTree.prototype = new Algorithm();
BPlusTree.prototype.varructor = BPlusTree;
BPlusTree.superclass = Algorithm.prototype;





BPlusTree.prototype.init = function(am, w, h)
{
	BPlusTree.superclass.init.call(this, am, w, h);
	this.nextIndex = 0;
	
	this.preemptiveSplit = false
	
	this.starting_x = w *2 / 3;


	this.addControls();
	
	
	this.max_keys = 2;
	this.min_keys = 1;
	this.split_index = 1;
	
	this.max_degree = 3;
	
	
	
	// this.cmd("CreateLabel", this.messageID+100, "123", MESSAGE_X+100, MESSAGE_Y+1000, 0);
	this.messageID = this.nextIndex++;
	this.cmd("CreateLabel", this.messageID, "", MESSAGE_X, MESSAGE_Y, 0);
	this.moveLabel1ID = this.nextIndex++;
	this.moveLabel2ID = this.nextIndex++;
	
	animationManager.StartNewAnimation(this.commands);
	animationManager.skipForward();
	animationManager.clearHistory();
	this.commands = new Array();
	
	this.first_print_pos_y = h - 3 * PRINT_VERTICAL_GAP;

	
	this.xPosOfNextLabel = 100;
	this.yPosOfNextLabel = 200;
    var insertedValue;
	this.implementAction(this.insertElement.bind(this),insertedValue);
    this.cmd("CreateLabel", 1100, "索引查找次数：", MESSAGE_X+1000, MESSAGE_Y, 0);
    this.cmd("CreateLabel", 1101, "全表扫描查找次数：", MESSAGE_X, MESSAGE_Y+50, 0);
    
}
BPlusTree.FOREGROUND_COLOR = "#000055"
BPlusTree.BACKGROUND_COLOR = "#AAAAFF"
BPlusTree.ELEMENT_WIDTH = 80;
BPlusTree.ELEMENT_HEIGHT = 30;
BPlusTree.prototype.makeRectangle = function(x, y, msg, id, withColor) {
    this.cmd("CreateRectangle", id, 
        msg, 
            BPlusTree.ELEMENT_WIDTH,
            BPlusTree.ELEMENT_HEIGHT,
            x, 
            y);
        if (withColor) {
            this.cmd("SetForegroundColor", id, BPlusTree.FOREGROUND_COLOR);
            this.cmd("SetBackgroundColor", id, BPlusTree.BACKGROUND_COLOR);
        }
}
let R_Table = [
	{ id: 2011, name: "Alice" },
	{ id: 2012, name: "Bob" },
	{ id: 2013, name: "Charlie" },
	{ id: 2014, name: "Diana" },
	{ id: 2015, name: "faker" },
	{ id: 2016, name: "zeus" },
	{ id: 2017, name: "oner" },
	{ id: 2018, name: "on" },
	{ id: 2019, name: "elk" }
]
BPlusTree.prototype.deleRectangle= function(id) {
    this.cmd("Delete", id);
        // if (withColor) {
        //     this.cmd("SetForegroundColor", id, BPlusTree.FOREGROUND_COLOR);
        //     this.cmd("SetBackgroundColor", id, BPlusTree.BACKGROUND_COLOR);
        // }
}
BPlusTree.prototype.drawRow = function (row, starting_x, starting_y, with_color, starting_id) {
    for (let i = 0; i < row.length; ++i) {
        this.makeRectangle(starting_x + BPlusTree.ELEMENT_WIDTH * i, starting_y, row[i], i + starting_id, with_color);
        // console.log(starting_id + i);
    }
}
BPlusTree.prototype.deleteRow = function () {
	let r_starting_id = 410000
	cnt=0;
	for (let i = 0; i < R_Table.length; ++i) {
		// if(i==x) continue;
		let cur_row = [R_Table[i].id, R_Table[i].name];
        this.deleRectangle(r_starting_id);
		this.deleRectangle(r_starting_id+1);
        // this.highLightRow([r_starting_id,r_starting_id+1],1);
		// this.insertElement(cur_row)
		// this.implementAction(this.insertElement.bind(this),cur_row[0]);
		// this.highLightRow([r_starting_id,r_starting_id+1],0);
		cnt++;
		r_starting_id+=2;
    }
}
BPlusTree.prototype.findRow = function (x) {
	let r_starting_id = 410000
	var cnt=0;
    console.log("213");
	for (let i = 0; i < R_Table.length; ++i) {
		// if(i==x) continue;
        this.highLightRow([r_starting_id,r_starting_id+1],1);
        this.cmd("step");
        this.highLightRow([r_starting_id,r_starting_id+1],0);
        cnt++;
		if(R_Table[i].name==x)
			{
			// console.log(R_Table[i].id+"!!");
			this.cmd("SetText", this.messageID, "Element " + x + " found");
			break;
			
		}
		r_starting_id+=2;
    }
    this.cmd("SetText", 1101, "全表扫描查找次数："+cnt);
    // this.cmd("CreateLabel", this.messageID+1002, "123", MESSAGE_X+50, MESSAGE_Y+50, 0);
    
}
BPlusTree.prototype.findRow0= function (x) {
	let r_starting_id = 410000
	var cnt=0;
    console.log("213");
	for (let i = 0; i < R_Table.length; ++i) {
        // if(i==x) continue;
        cnt++;
		if(R_Table[i].name==x)
			{
                this.highLightRow([r_starting_id,r_starting_id+1],1);
                this.cmd("step");
                this.highLightRow([r_starting_id,r_starting_id+1],0);
			// console.log(R_Table[i].id+"!!");
			break;
			
		}
		r_starting_id+=2;
    }
    // this.cmd("CreateLabel", 1102, "全表扫描查找次数：", MESSAGE_X+50, MESSAGE_Y+50, 0);
    // this.cmd("CreateLabel", this.messageID+1002, "123", MESSAGE_X+50, MESSAGE_Y+50, 0);
    
}
BPlusTree.prototype.restart = function (x,r_starting_id) {
	BPlusTree.TABLE_R_X = 50;
	BPlusTree.TABLE_R_Y = 100;
	// let R_Table = [
	// 	{ id: 1, name: "Alice" },
	// 	{ id: 2, name: "Bob" },
	// 	{ id: 3, name: "Charlie" },
	// 	{ id: 4, name: "Diana" }
	// ];
	BPlusTree.explainLabel = 321374;
BPlusTree.EXPLAINLABEL_X = 330;
BPlusTree.EXPLAINLABEL_Y = 30
var r_table_label=123456
var Box_Staring_ID = 1000;
let box_starting_id = Box_Staring_ID;
// let r_starting_id = 410000
let r_col_info = ["studentid", "name"];
	// this.cmd("CreateLabel", BPlusTree.explainLabel, "", BPlusTree.EXPLAINLABEL_X + 150,BPlusTree.EXPLAINLABEL_Y );
    // // 构造R表
    // this.cmd("CreateLabel", r_table_label, "Table R", BPlusTree.TABLE_R_X, BPlusTree.TABLE_R_Y-30);
	// this.highLightRow(r_table_label,1);
	if(x!=0)
    this.drawRow(r_col_info, BPlusTree.TABLE_R_X, BPlusTree.TABLE_R_Y, true, Box_Staring_ID);
    box_starting_id += r_col_info.length;
	var cnt=0;
    for (let i = 0; i < R_Table.length; ++i) {
		if(i==x) continue;
		let cur_row = [R_Table[i].id, R_Table[i].name];
        this.drawRow(cur_row, BPlusTree.TABLE_R_X, BPlusTree.TABLE_R_Y  + (cnt + 1) * BPlusTree.ELEMENT_HEIGHT, false, r_starting_id);
        this.highLightRow([r_starting_id,r_starting_id+1],1);
		// this.insertElement(cur_row)
		// this.implementAction(this.insertElement.bind(this),cur_row[0]);
		this.highLightRow([r_starting_id,r_starting_id+1],0);
		cnt++;
		r_starting_id += cur_row.length;
    }
}
BPlusTree.prototype.highLightRow = function(ids, highlight_val) {
    for (let i = 0; i < ids.length; ++i) {
        this.cmd("SetHighlight", ids[i], highlight_val);
    }
}
BPlusTree.prototype.addControls =  function()
{
	this.controls = [];
	this.restart(100,410000);
	// this.insertField = addControlToAlgorithmBar("Text", "");
	// this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), 4);
	// this.controls.push(this.insertField);
	// thie.cmd("CreateRectangle",123456,"12345",100,100,100,100);
	// this.cmd("CreateRectangle", 1234567, "123456\n1234", 100, 100, 50, 50, "center", "center", "#FFFFFF", "#000000");
	
	// this.insertButton = addControlToAlgorithmBar("Button", "Insert");
	// this.insertButton.onclick = this.insertCallback.bind(this);
	// this.controls.push(this.insertButton);
	
	// this.deleteField = addControlToAlgorithmBar("Text", "");
	// this.deleteField.onkeydown = this.returnSubmit(this.deleteField,  this.deleteCallback.bind(this), 4);
	// this.controls.push(this.deleteField);
	
	// this.deleteButton = addControlToAlgorithmBar("Button", "Delete");
	// this.deleteButton.onclick = this.deleteCallback.bind(this);
	// this.controls.push(this.deleteButton);
	
	
	this.findField = addControlToAlgorithmBar("Text", "");
	this.findField.onkeydown = this.returnSubmit(this.findField,  this.findCallback.bind(this), 10);
	this.controls.push(this.findField);
	this.findButton = addControlToAlgorithmBar("Button", "IndexFind");
	this.findButton.onclick = this.findCallback.bind(this);
	this.controls.push(this.findButton);
	this.findField1= addControlToAlgorithmBar("Text", "");
	this.findField1.onkeydown = this.returnSubmit(this.findField1,  this.find1Callback.bind(this), 10);
	this.controls.push(this.findField1);
	this.findButton1 = addControlToAlgorithmBar("Button", "TableFind");
	this.findButton1.onclick = this.find1Callback.bind(this);
	this.controls.push(this.findButton1);
	
	// this.printButton = addControlToAlgorithmBar("Button", "Print");
	// this.printButton.onclick = this.printCallback.bind(this);
	// this.controls.push(this.printButton);
	
	// this.clearButton = addControlToAlgorithmBar("Button", "Clear");
	// this.clearButton.onclick = this.clearCallback.bind(this);
	// this.controls.push(this.clearButton);
	
	var i;
	radioButtonNames = [];
	for (i = MIN_MAX_DEGREE; i <= MAX_MAX_DEGREE; i++)
	{
		radioButtonNames.push("Max. Degree = " + String(i));
	}
	
	this.maxDegreeRadioButtons = addRadioButtonGroupToAlgorithmBar(radioButtonNames, "MaxDegree");
	
	this.maxDegreeRadioButtons[0].checked = true;
	for(i = 0; i < this.maxDegreeRadioButtons.length; i++)
	{
		this.maxDegreeRadioButtons[i].onclick = this.maxDegreeChangedHandler.bind(this,i+MIN_MAX_DEGREE);
	}
	
//	this.premptiveSplitBox = addCheckboxToAlgorithmBar("Preemtive Split / Merge (Even max degree only)");
//	this.premptiveSplitBox.onclick = this.premtiveSplitCallback.bind(this);
	
	// Other buttons ...
	
}

BPlusTree.prototype.ppTree = function(tree)
{
	if (tree != null)
	{
		if (!tree.isLeaf)
		{
			for (var i = 0; i <= tree.numKeys; i++)
			{
				// this.cmd("Disconnect", tree.graphicID, tree.children[i].graphicID);
				this.ppTree(tree.children[i]);
				// tree.children[i] == null;
			}
		}
		else{
			console.log(tree.keys[0]);
			// this.cmd("Connect", tree.graphicID, 
			// 	410000+((tree.keys[0]-1)*2)+1,
			// 	FOREGROUND_COLOR,
			// 	0, // Curve
			// 	1, // Directed
			// 	"", // Label
			// 	tree.numKeys);
		}
		// this.cmd("Delete", tree.graphicID);
	}
}
		
		
				
BPlusTree.prototype.reset = function()
{
	this.nextIndex = 3;
	this.max_degree = 3;
	this.max_keys = 2;
	this.min_keys = 1;
	this.split_index = 1;
	// NOTE: The order of these last two this.commands matters!
	this.treeRoot = null;
	this.ignoreInputs = true;
	// maxDegreeButtonArray[this.max_degree].selected = true;
	this.ignoreInputs = false;
}

		
BPlusTree.prototype.enableUI = function(event)
{
	var i;
	for (i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
	for (i = 0; i < this.maxDegreeRadioButtons.length; i++)
	{	
		this.maxDegreeRadioButtons[i].disabled = false;
	}
}

BPlusTree.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}

	for (i = 0; i < this.maxDegreeRadioButtons.length; i++)
	{	
		this.maxDegreeRadioButtons[i].disabled = true;
	}
	
}


//TODO:  Fix me!
BPlusTree.prototype.maxDegreeChangedHandler = function(newMaxDegree, event) 
{
	if (this.max_degree != newMaxDegree)
	{
		this.implementAction(this.changeDegree.bind(this), newMaxDegree);
	}
}
		


BPlusTree.prototype.insertCallback = function(event)
{
	var insertedValue;
	this.implementAction(this.insertElement.bind(this),insertedValue);
	// insertedValue = this.normalizeNumber(this.insertField.value, 4);
	// if (insertedValue != "")
	// {
	// 	this.insertField.value = "";
	// 	this.implementAction(this.insertElement.bind(this),insertedValue);
	// }
}
		
BPlusTree.prototype.deleteCallback = function(event)
{
	var deletedValue ;
		this.implementAction(this.deleteElement.bind(this),deletedValue);	
	// if (deletedValue != "")
	// {
	// 	deletedValue = this.normalizeNumber(this.deleteField.value, 4);
	// 	this.deleteField.value = "";
	// 	this.implementAction(this.deleteElement.bind(this),deletedValue);		
	// }
}
		
BPlusTree.prototype.clearCallback = function(event)
{
	this.implementAction(this.clearTree.bind(this), "");
}
		
		
BPlusTree.prototype.premtiveSplitCallback = function(event)
{
//	if (this.preemptiveSplit != this.premptiveSplitBox.checked)
//	{
//		this.implementAction(this.changePreemtiveSplit.bind(this), this.premptiveSplitBox.checked);
//	}
}

		
BPlusTree.prototype.changePreemtiveSplit = function(newValue)
{
//	this.commands = new Array();
//	this.cmd("Step");
//	this.preemptiveSplit = newValue;
//	if (this.premptiveSplitBox.checked != this.preemptiveSplit)
//	{
//		this.premptiveSplitBox.checked = this.preemptiveSplit;
//	}
//	return this.commands;			
}
		

BPlusTree.prototype.printCallback = function(event) 
{
	this.implementAction(this.printTree.bind(this),"");						
}



BPlusTree.prototype.printTree = function(unused)
{
	
	this.commands = new Array();
	this.cmd("SetText", this.messageID, "Printing tree");
	var firstLabel = this.nextIndex;
	
	if (this.treeRoot != null)
	{
		this.xPosOfNextLabel = FIRST_PRINT_POS_X;
		this.yPosOfNextLabel = this.first_print_pos_y;
		
		var tmp = this.treeRoot;
		
		this.cmd("SetHighlight", tmp.graphicID, 1);
		this.cmd("Step");
		while (!tmp.isLeaf)
		{
			this.cmd("SetEdgeHighlight", tmp.graphicID, tmp.children[0].graphicID, 1);
			this.cmd("Step");
			this.cmd("SetHighlight", tmp.graphicID, 0);
			this.cmd("SetHighlight", tmp.children[0].graphicID, 1);
			this.cmd("SetEdgeHighlight", tmp.graphicID, tmp.children[0].graphicID, 0);
			this.cmd("Step");
			tmp = tmp.children[0];				
		}
		
		while (tmp!= null)
		{
			this.cmd("SetHighlight", tmp.graphicID, 1);
			for (i = 0; i < tmp.numKeys; i++)
			{
				var nextLabelID = this.nextIndex++;
				this.cmd("CreateLabel", nextLabelID, tmp.keys[i], this.getLabelX(tmp, i), tmp.y);
				this.cmd("SetForegroundColor", nextLabelID, PRINT_COLOR);
				this.cmd("Move", nextLabelID, this.xPosOfNextLabel, this.yPosOfNextLabel);
				this.cmd("Step");			
				this.xPosOfNextLabel +=  PRINT_HORIZONTAL_GAP;
				if (this.xPosOfNextLabel > PRINT_MAX)
				{
					this.xPosOfNextLabel = FIRST_PRINT_POS_X;
					this.yPosOfNextLabel += PRINT_VERTICAL_GAP;
				}
			}
			if (tmp.next != null)
			{
				this.cmd("SetEdgeHighlight", tmp.graphicID, tmp.next.graphicID, 1);
				this.cmd("Step");
				this.cmd("SetEdgeHighlight", tmp.graphicID, tmp.next.graphicID, 0);
			}
			this.cmd("SetHighlight", tmp.graphicID, 0);
			tmp = tmp.next;
			
		}
		this.cmd("Step");
		for (var i = firstLabel; i < this.nextIndex; i++)
		{
			this.cmd("Delete", i);
		}
		this.nextIndex = firstLabel;
	}
	this.cmd("SetText", this.messageID, "");
	return this.commands;
}








BPlusTree.prototype.clearTree = function(ignored)
{
	this.commands = new Array();
	this.deleteTree(this.treeRoot);
	this.treeRoot = null;
	this.nextIndex = 3;		
	return this.commands;
}

BPlusTree.prototype.deleteTree = function(tree)
{
	if (tree != null)
	{
		if (!tree.isLeaf)
		{
			for (var i = 0; i <= tree.numKeys; i++)
			{
				this.cmd("Disconnect", tree.graphicID, tree.children[i].graphicID);
				this.deleteTree(tree.children[i]);
				tree.children[i] == null;
			}
		}
		this.cmd("Delete", tree.graphicID);
	}
}


BPlusTree.prototype.changeDegree = function(degree)
{
	this.commands = new Array();
	this.deleteTree(this.treeRoot);
	this.treeRoot = null;
	this.nextIndex = 3;
	var newDegree = degree;
	this.ignoreInputs = true;
	//TODO:  Check me!
	this.maxDegreeRadioButtons[newDegree - MIN_MAX_DEGREE].checked = true;
	
	this.ignoreInputs = false;
	this.max_degree = newDegree;
	this.max_keys = newDegree - 1;
	this.min_keys = Math.floor((newDegree + 1) / 2) - 1;
	this.split_index = Math.floor((newDegree) / 2);
	if (this.commands.length == 0)
	{
		this.cmd("Step");
	}
	if (newDegree % 2 != 0 && this.preemptiveSplit)
	{
		this.preemptiveSplit = false;
		this.premptiveSplitBox.checked = false;
	}
	return this.commands;
}


BPlusTree.prototype.findCallback = function(event)
{
	var findValue;
	findValue = this.normalizeNumber(this.findField.value, 4);
	this.findField.value = "";
	this.implementAction(this.findElement.bind(this),findValue);						
}
BPlusTree.prototype.find1Callback = function(event)
{
	var findValue;
	findValue = this.normalizeNumber(this.findField1.value, 4);
	// console.log(findValue);
	this.findField.value = "";
	this.implementAction(this.findElement1.bind(this),findValue);						
}
BPlusTree.prototype.findElement1 = function(findValue)
{
	this.commands = new Array();

	this.cmd("SetText", this.messageID, "Finding " + findValue);
	// this.findInTree(this.treeRoot, findValue);
	// this.findintext(findValue);
	
    this.findRow(findValue);
	return this.commands;
}
BPlusTree.prototype.findElement = function(findValue)
{
	this.commands = new Array();

	this.cmd("SetText", this.messageID, "Finding " + findValue);
	this.findInTree(this.treeRoot, findValue);
	// this.findintext(findValue);
    // this.findRow(findValue);
	return this.commands;
}
BPlusTree.prototype.find1Element = function(findValue)
{
	this.commands = new Array();

	this.cmd("SetText", this.messageID, "Finding " + findValue);
	// this.findInTree(this.treeRoot, findValue);
	// this.findintext(findValue);
    this.findRow(findValue);
	return this.commands;
}

var cnt1=0;
BPlusTree.prototype.findInTree = function(tree, val)
{
	if (tree != null)
	{
        cnt1++;
		this.cmd("SetHighlight", tree.graphicID, 1);
		this.cmd("Step");
		var i;
		for (i = 0; i < tree.numKeys && tree.keys[i] < val; i++);
		if (i == tree.numKeys)
		{
			if (!tree.isLeaf)
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[tree.numKeys].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[tree.numKeys].graphicID, 0);
				this.findInTree(tree.children[tree.numKeys], val);
			}
			else
			{
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetText", this.messageID, "Element " + val + " is not in the table");
                this.cmd("SetText",1100,"索引查找次数："+cnt1);
                cnt1=0;
			}
		}
		else if (tree.keys[i] > val)
		{
			if (!tree.isLeaf)
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 0);					
				this.findInTree(tree.children[i], val);
			}
			else
			{
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetText", this.messageID, "Element " + val + " is not in the table");
                this.cmd("SetText",1100,"索引查找次数："+cnt1);
                cnt1=0;
			}
		}
		else
		{
			if (tree.isLeaf)
			{
				this.cmd("SetTextColor", tree.graphicID, "#FF0000", i);
				this.cmd("SetText", this.messageID, "Element " + val + " found");
				this.cmd("Step");
				this.cmd("SetTextColor", tree.graphicID, FOREGROUND_COLOR, i);
				this.cmd("SetHighlight", tree.graphicID, 0);
				
				this.cmd("Step");
				this.findRow0(val);
				// var r_starting_id=410000;
				// this.highLightRow([r_starting_id+(val-2011)*2,r_starting_id+(val-2011)*2+1],1);
				// this.cmd("Step");
                this.cmd("SetText",1100,"索引查找次数："+cnt1);
                cnt1=0
				// this.highLightRow([r_starting_id+(val-2011)*2,r_starting_id+(val-2011)*2+1],0);
			}
			else
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 0);					
				this.findInTree(tree.children[i+1], val);				
			}
		}
	}
	else
	{
		this.cmd("SetText", this.messageID, "Element " + val + " is not in the table");
        this.cmd("SetText",1100,"索引查找次数："+cnt1);
                cnt1=0;
	}
}

BPlusTree.prototype.insertElement = function()
{
    var insertedValue;
	var r_starting_id=410000;
	this.commands = new Array();
	for(var i=1;i<R_Table.length+1;i++)
	{
		insertedValue=R_Table[i-1].name;
		this.highLightRow([r_starting_id,r_starting_id+1],1);
		// this.insertElement(cur_row)
		// this.implementAction(this.insertElement.bind(this),cur_row[0]);
		

	this.cmd("SetText", this.messageID, "Inserting " + insertedValue);
	this.cmd("Step");
	
	if (this.treeRoot == null)
	{
		this.treeRoot = new BTreeNode(this.nextIndex++, this.starting_x, STARTING_Y);
		this.cmd("CreateBTreeNode",this.treeRoot.graphicID, WIDTH_PER_ELEM, NODE_HEIGHT, 1, this.starting_x, STARTING_Y, BACKGROUND_COLOR,  FOREGROUND_COLOR);
		this.treeRoot.keys[0] = insertedValue;
		this.cmd("SetText", this.treeRoot.graphicID, insertedValue, 0);
	}
	else
	{
		this.insert(this.treeRoot, insertedValue);					
		if (!this.treeRoot.isLeaf)
		{
			this.resizeTree();
		}
	}
	
	this.cmd("SetText", this.messageID, "");
	this.highLightRow([r_starting_id,r_starting_id+1],0);
	r_starting_id+=2;
	}
	this.ppTree(this.treeRoot);
	return this.commands;
	
}




BPlusTree.prototype.insert  = function(tree, insertValue)
{
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("Step");
	if (tree.isLeaf)
	{
		this.cmd("SetText", this.messageID, "Inserting " + insertValue + ".  Inserting into a leaf");
		tree.numKeys++;
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
		var insertIndex = tree.numKeys - 1;
		while (insertIndex > 0 && tree.keys[insertIndex - 1] > insertValue)
		{
			tree.keys[insertIndex] = tree.keys[insertIndex - 1];
			this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
			insertIndex--;
		}
		tree.keys[insertIndex] = insertValue;
		this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
		this.cmd("SetHighlight", tree.graphicID, 0);
		if (tree.next != null)
		{
			this.cmd("Disconnect", tree.graphicID, tree.next.graphicID);
			this.cmd("Connect", tree.graphicID, 
				tree.next.graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				1, // Directed
				"", // Label
				tree.numKeys);
			
			
		}
		this.resizeTree();
		this.insertRepair(tree);
	}
	else
	{
		var findIndex = 0;
		while (findIndex < tree.numKeys && tree.keys[findIndex] < insertValue)
		{
			findIndex++;					
		}				
		this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[findIndex].graphicID, 1);
		// this.cmd("Step");
		this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[findIndex].graphicID, 0);
		this.cmd("SetHighlight", tree.graphicID, 0);
		this.insert(tree.children[findIndex], insertValue);				
	}
}

BPlusTree.prototype.insertRepair = function(tree) 
{
	if (tree.numKeys <= this.max_keys)
	{
		return;
	}
	else if (tree.parent == null)
	{
		this.treeRoot = this.split(tree);
		return;
	}
	else
	{
		var newNode  = this.split(tree);
		this.insertRepair(newNode);
	}			
}

BPlusTree.prototype.split = function(tree)
{
	this.cmd("SetText", this.messageID, "Node now contains too many keys.  Splittig ...");
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("Step");
	this.cmd("SetHighlight", tree.graphicID, 0);
	var rightNode = new BTreeNode(this.nextIndex++, tree.x + 100, tree.y);
	
	var risingNode = tree.keys[this.split_index];
	
	var i;
	var parentIndex
	if (tree.parent != null)
	{
		var currentParent = tree.parent;
		for (parentIndex = 0; parentIndex < currentParent.numKeys + 1 && currentParent.children[parentIndex] != tree; parentIndex++);
		if (parentIndex == currentParent.numKeys + 1)
		{
			throw new Error("Couldn't find which child we were!");
		}
		this.cmd("SetNumElements", currentParent.graphicID, currentParent.numKeys + 1);
		for (i = currentParent.numKeys; i > parentIndex; i--)
		{
			currentParent.children[i+1] = currentParent.children[i];
			this.cmd("Disconnect", currentParent.graphicID, currentParent.children[i].graphicID);
			this.cmd("Connect", currentParent.graphicID,  currentParent.children[i].graphicID, FOREGROUND_COLOR, 
				0, // Curve
				0, // Directed
				"", // Label
				i+1);
			
			currentParent.keys[i] = currentParent.keys[i-1];
			this.cmd("SetText", currentParent.graphicID, currentParent.keys[i] ,i);
		}
		currentParent.numKeys++;
		currentParent.keys[parentIndex] = risingNode;
		this.cmd("SetText", currentParent.graphicID, "", parentIndex);
		this.cmd("CreateLabel", this.moveLabel1ID, risingNode, this.getLabelX(tree, this.split_index),  tree.y)
		this.cmd("Move", this.moveLabel1ID,  this.getLabelX(currentParent, parentIndex),  currentParent.y)
		
		
		
		
		currentParent.children[parentIndex+1] = rightNode;
		rightNode.parent = currentParent;
		
	}
	
	var rightSplit;
	
	if (tree.isLeaf)
	{
		rightSplit = this.split_index;
		rightNode.next = tree.next;
		tree.next = rightNode;
	}
	else
	{
		rightSplit = this.split_index + 1;
	}
	
	rightNode.numKeys = tree.numKeys - rightSplit;
	
	this.cmd("CreateBTreeNode",rightNode.graphicID, WIDTH_PER_ELEM, NODE_HEIGHT, tree.numKeys -rightSplit, tree.x, tree.y,  BACKGROUND_COLOR, FOREGROUND_COLOR);
	
	if (tree.isLeaf)
	{
		if (rightNode.next != null)
		{
			
			this.cmd("Disconnect", tree.graphicID, rightNode.next.graphicID);
			this.cmd("Connect", rightNode.graphicID, 
				rightNode.next.graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				1, // Directed
				"", // Label
				rightNode.numKeys);
			
			
		}
		this.cmd("Connect", tree.graphicID, 
			rightNode.graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			1, // Directed
			"", // Label
			this.split_index);				
	}
	
	
	for (var i = rightSplit; i < tree.numKeys + 1; i++)
	{
		rightNode.children[i - rightSplit] = tree.children[i];
		if (tree.children[i] != null)
		{
			rightNode.isLeaf = false;
			this.cmd("Disconnect", tree.graphicID, tree.children[i].graphicID);
			
			this.cmd("Connect", rightNode.graphicID, 
				rightNode.children[i - rightSplit].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				i - rightSplit);
			if (tree.children[i] != null)
			{
				tree.children[i].parent = rightNode;
			}
			tree.children[i] = null;
			
		}
	}
	for (i =rightSplit; i < tree.numKeys; i++)
	{
		rightNode.keys[i - rightSplit] = tree.keys[i];
		this.cmd("SetText", rightNode.graphicID, rightNode.keys[i -rightSplit], i - rightSplit);
	}
	var leftNode = tree;
	leftNode.numKeys = this.split_index;
	// TO MAKE UNDO WORK -- CAN REMOVE LATER VV
	for (i = this.split_index; i < tree.numKeys; i++)
	{
		this.cmd("SetText", tree.graphicID, "", i); 
	}
	// TO MAKE UNDO WORK -- CAN REMOVE LATER ^^
	this.cmd("SetNumElements", tree.graphicID, this.split_index);
	
	if (tree.parent != null)
	{
		this.cmd("Connect", currentParent.graphicID, rightNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			parentIndex + 1);
		this.resizeTree();
		this.cmd("Step")
		this.cmd("Delete", this.moveLabel1ID);				
		this.cmd("SetText", currentParent.graphicID, risingNode, parentIndex);
		return tree.parent;
	}
	else //			if (tree.parent == null)
	{
		this.treeRoot = new BTreeNode(this.nextIndex++, this.starting_x, STARTING_Y);
		this.cmd("CreateBTreeNode",this.treeRoot.graphicID, WIDTH_PER_ELEM, NODE_HEIGHT, 1, this.starting_x, STARTING_Y,BACKGROUND_COLOR,  FOREGROUND_COLOR);
		this.treeRoot.keys[0] = risingNode;
		this.cmd("SetText", this.treeRoot.graphicID, risingNode, 0);
		this.treeRoot.children[0] = leftNode;
		this.treeRoot.children[1] = rightNode;
		leftNode.parent = this.treeRoot;
		rightNode.parent = this.treeRoot;
		this.cmd("Connect", this.treeRoot.graphicID, leftNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			0);	// Connection Point
		this.cmd("Connect", this.treeRoot.graphicID, rightNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			1); // Connection Point
		this.treeRoot.isLeaf = false;
		return this.treeRoot;
	}
	
	
	
}

BPlusTree.prototype.deleteElement = function(deletedValue)
{
	this.commands = new Array();
	this.cmd("SetText", 0, "Deleting "+deletedValue);
	this.cmd("Step");
	this.cmd("SetText", 0, "");
	this.cmd("SetText", 0, "");
	this.doDelete(this.treeRoot, 2011);
	if (this.treeRoot.numKeys == 0)
	{
		this.cmd("Delete", this.treeRoot.graphicID);
		this.treeRoot = this.treeRoot.children[0];
		this.treeRoot.parent = null;
		this.resizeTree();
	}
	this.doDelete(this.treeRoot, 5);
	if (this.treeRoot.numKeys == 0)
		{
			this.cmd("Delete", this.treeRoot.graphicID);
			this.treeRoot = this.treeRoot.children[0];
			this.treeRoot.parent = null;
			this.resizeTree();
		}
	return this.commands;						
}




BPlusTree.prototype.doDelete = function(tree, val)
{
	if (tree != null)
	{
		this.cmd("SetHighlight", tree.graphicID, 1);
		this.cmd("Step");
		var i;
		for (i = 0; i < tree.numKeys && tree.keys[i] < val; i++);
		if (i == tree.numKeys)
		{
			if (!tree.isLeaf)
			{
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[tree.numKeys].graphicID, 1);
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[tree.numKeys].graphicID, 0);
				this.doDelete(tree.children[tree.numKeys], val);
			}
			else
			{
				this.cmd("SetHighlight", tree.graphicID, 0);
			}
		}
		else if (!tree.isLeaf && tree.keys[i] == val)
		{
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 1);
			this.cmd("Step");
			this.cmd("SetHighlight", tree.graphicID, 0);
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i+1].graphicID, 0);					
			this.doDelete(tree.children[i+1], val);
		}
		else if (!tree.isLeaf)
		{
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 1);
			this.cmd("Step");
			this.cmd("SetHighlight", tree.graphicID, 0);
			this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[i].graphicID, 0);					
			this.doDelete(tree.children[i], val);			
		}
		else if (tree.isLeaf && tree.keys[i] == val)
		{
			this.cmd("SetTextColor", tree.graphicID, 0xFF0000, i);
			this.cmd("Step");
			this.cmd("SetTextColor", tree.graphicID, FOREGROUND_COLOR, i);
			for (var j = i; j < tree.numKeys - 1; j++)
			{
				tree.keys[j] = tree.keys[j+1];
				this.cmd("SetText", tree.graphicID, tree.keys[j], j);
			}
			tree.numKeys--;
			this.cmd("SetText", tree.graphicID, "", tree.numKeys);
			this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
			this.cmd("SetHighlight", tree.graphicID, 0);
			
			if (tree.next != null)
			{
				this.cmd("Disconnect", tree.graphicID, tree.next.graphicID);
				this.cmd("Connect", tree.graphicID, 
					tree.next.graphicID,
					FOREGROUND_COLOR,
					0, // Curve
					1, // Directed
					"", // Label
					tree.numKeys);
			}
			var r_starting_id=410000;
				this.highLightRow([r_starting_id+(val-2011)*2,r_starting_id+(val-2011)*2+1],1);
				this.cmd("Step");
				this.highLightRow([r_starting_id+(val-2011)*2,r_starting_id+(val-2011)*2+1],0);
				// this.deleRectangle(r_starting_id+(val-2011)*2);
				// this.deleRectangle(r_starting_id+(val-2011)*2+1);
				this.deleteRow();
				this.cmd("step");
				this.restart(0,510000);
			// Bit of a hack -- if we remove the smallest element in a leaf, then find the *next* smallest element
			//  (somewhat tricky if the leaf is now empty!), go up our parent stack, and fix index keys
			if (i == 0 && tree.parent != null)
			{
				var nextSmallest = "";
				var parentNode = tree.parent;
				var parentIndex;
				for (parentIndex = 0; parentNode.children[parentIndex] != tree; parentIndex++);
				if (tree.numKeys == 0)
				{
					if (parentIndex == parentNode.numKeys)
					{
						nextSmallest == "";
					}
					else
					{
						nextSmallest = parentNode.children[parentIndex+1].keys[0];			
					}
				}
				else
				{
					nextSmallest = tree.keys[0];
				}
				while (parentNode != null)
				{
					if (parentIndex > 0 && parentNode.keys[parentIndex - 1] == val)
					{
						parentNode.keys[parentIndex - 1] = nextSmallest;
						this.cmd("SetText", parentNode.graphicID, parentNode.keys[parentIndex - 1], parentIndex - 1);								
					}
					var grandParent = parentNode.parent;
					for (parentIndex = 0; grandParent != null && grandParent.children[parentIndex] != parentNode; parentIndex++);
					parentNode = grandParent;
					
				}
				
			}
			this.repairAfterDelete(tree);
			
		}
		else
		{
			this.cmd("SetHighlight", tree.graphicID, 0);
		}
		
	}
}



BPlusTree.prototype.mergeRight = function(tree) 
{
	this.cmd("SetText", this.messageID, "Merging node");
	
	var parentNode = tree.parent;
	var parentIndex = 0;
	for (parentIndex = 0; parentNode.children[parentIndex] != tree; parentIndex++);
	var rightSib = parentNode.children[parentIndex+1];
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("SetHighlight", parentNode.graphicID, 1);
	this.cmd("SetHighlight", rightSib.graphicID, 1);
	
	this.cmd("Step");
	if (tree.isLeaf)
	{
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys + rightSib.numKeys);
	}
	else
	{
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys + rightSib.numKeys + 1);
		this.cmd("SetText", tree.graphicID, "", tree.numKeys);
		this.cmd("CreateLabel", this.moveLabel1ID, parentNode.keys[parentIndex],  this.getLabelX(parentNode, parentIndex),  parentNode.y);
		tree.keys[tree.numKeys] = parentNode.keys[parentIndex];
	}
	tree.x = (tree.x + rightSib.x) / 2
	this.cmd("SetPosition", tree.graphicID, tree.x,  tree.y);
	
	
	var fromParentIndex = tree.numKeys;
	
	
	for (var i = 0; i < rightSib.numKeys; i++)
	{
		var insertIndex =  tree.numKeys + 1 + i;
		if (tree.isLeaf)
		{
			insertIndex -= 1;
		}
		tree.keys[insertIndex] = rightSib.keys[i];
		this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
		this.cmd("SetText", rightSib.graphicID, "", i);
	}
	if (!tree.isLeaf)
	{
		for (i = 0; i <= rightSib.numKeys; i++)
		{
			this.cmd("Disconnect", rightSib.graphicID, rightSib.children[i].graphicID);
			tree.children[tree.numKeys + 1 + i] = rightSib.children[i];
			tree.children[tree.numKeys + 1 + i].parent = tree;
			this.cmd("Connect", tree.graphicID, 
				tree.children[tree.numKeys + 1 + i].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				tree.numKeys + 1 + i);
		}
		tree.numKeys = tree.numKeys + rightSib.numKeys + 1;
		
	}
	else
	{
		tree.numKeys = tree.numKeys + rightSib.numKeys;
		
		tree.next = rightSib.next;
		if (rightSib.next != null)
		{
			this.cmd("Connect", tree.graphicID, 
				tree.next.graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				1, // Directed
				"", // Label
				tree.numKeys);				
			
		}
	}
	this.cmd("Disconnect", parentNode.graphicID, rightSib.graphicID);
	for (i = parentIndex+1; i < parentNode.numKeys; i++)
	{
		this.cmd("Disconnect", parentNode.graphicID, parentNode.children[i+1].graphicID);
		parentNode.children[i] = parentNode.children[i+1];
		this.cmd("Connect", parentNode.graphicID, 
			parentNode.children[i].graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			0, // Directed
			"", // Label
			i);
		parentNode.keys[i-1] = parentNode.keys[i];
		this.cmd("SetText", parentNode.graphicID, parentNode.keys[i-1], i-1);					
	}
	this.cmd("SetText", parentNode.graphicID, "", parentNode.numKeys - 1);
	parentNode.numKeys--;
	this.cmd("SetNumElements", parentNode.graphicID, parentNode.numKeys);
	this.cmd("SetHighlight", tree.graphicID, 0);
	this.cmd("SetHighlight", parentNode.graphicID, 0);
	this.cmd("SetHighlight", rightSib.graphicID, 0);
	
	this.cmd("Delete", rightSib.graphicID);
	if (!tree.isLeaf)
	{
		this.cmd("Move", this.moveLabel1ID, this.getLabelX(tree, fromParentIndex), tree.y);
		this.cmd("Step");
		this.cmd("Delete", this.moveLabel1ID);
		this.cmd("SetText", tree.graphicID, tree.keys[fromParentIndex], fromParentIndex);
	}
	// this.resizeTree();
	
	this.cmd("SetText", this.messageID, "");
	return tree;
}


BPlusTree.prototype.stealFromRight = function(tree, parentIndex) 
{
	// Steal from right sibling
	var parentNode = tree.parent;
	
	this.cmd("SetNumElements", tree.graphicID, tree.numKeys+1);					
	
	this.cmd("SetText", this.messageID, "Stealing from right sibling");
	
	var rightSib = parentNode.children[parentIndex + 1];
	tree.numKeys++;
	
	this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
	
	if (tree.isLeaf)
	{
		this.cmd("Disconnect", tree.graphicID, tree.next.graphicID);
		this.cmd("Connect", tree.graphicID, 
			tree.next.graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			1, // Directed
			"", // Label
			tree.numKeys);
	}
	
	
	this.cmd("SetText", tree.graphicID, "",  tree.numKeys - 1);
	this.cmd("SetText", parentNode.graphicID, "", parentIndex);
	this.cmd("SetText", rightSib.graphicID, "", 0);
	
	if (tree.isLeaf)
	{
		this.cmd("CreateLabel", this.moveLabel1ID, rightSib.keys[1], this.getLabelX(rightSib, 1),  rightSib.y)
		this.cmd("CreateLabel", this.moveLabel2ID, rightSib.keys[0], this.getLabelX(rightSib, 0),  rightSib.y)
		tree.keys[tree.numKeys - 1] = rightSib.keys[0];
		parentNode.keys[parentIndex] = rightSib.keys[1];
		
	}
	else
	{
		this.cmd("CreateLabel", this.moveLabel1ID, rightSib.keys[0], this.getLabelX(rightSib, 0),  rightSib.y)
		this.cmd("CreateLabel", this.moveLabel2ID, parentNode.keys[parentIndex], this.getLabelX(parentNode, parentIndex),  parentNode.y)
		tree.keys[tree.numKeys - 1] = parentNode.keys[parentIndex];
		parentNode.keys[parentIndex] = rightSib.keys[0];
	}
	
	
	this.cmd("Move", this.moveLabel1ID, this.getLabelX(parentNode, parentIndex),  parentNode.y);
	this.cmd("Move", this.moveLabel2ID, this.getLabelX(tree, tree.numKeys - 1), tree.y);
	
	this.cmd("Step")
	this.cmd("Delete", this.moveLabel1ID);
	this.cmd("Delete", this.moveLabel2ID);
	
	
	
	
	this.cmd("SetText", tree.graphicID, tree.keys[tree.numKeys - 1], tree.numKeys - 1);
	this.cmd("SetText", parentNode.graphicID, parentNode.keys[parentIndex], parentIndex);
	if (!tree.isLeaf)
	{
		tree.children[tree.numKeys] = rightSib.children[0];
		tree.children[tree.numKeys].parent = tree;
		this.cmd("Disconnect", rightSib.graphicID, rightSib.children[0].graphicID);
		this.cmd("Connect", tree.graphicID, 
			tree.children[tree.numKeys].graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			0, // Directed
			"", // Label
			tree.numKeys);	
		// TODO::CHECKME!
		
		for (var i = 1; i < rightSib.numKeys + 1; i++)
		{
			this.cmd("Disconnect", rightSib.graphicID, rightSib.children[i].graphicID);
			rightSib.children[i-1] = rightSib.children[i];
			this.cmd("Connect", rightSib.graphicID, 
				rightSib.children[i-1].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				i-1);								
		}
		
	}
	for (i = 1; i < rightSib.numKeys; i++)
	{
		rightSib.keys[i-1] = rightSib.keys[i];
		this.cmd("SetText", rightSib.graphicID, rightSib.keys[i-1], i-1);
	}
	this.cmd("SetText", rightSib.graphicID, "", rightSib.numKeys-1);
	rightSib.numKeys--;
	this.cmd("SetNumElements", rightSib.graphicID, rightSib.numKeys);
	this.resizeTree();
	this.cmd("SetText", this.messageID, "");
	
	if (tree.isLeaf)
	{
		
		if (rightSib.next != null)
		{
			this.cmd("Disconnect", rightSib.graphicID, rightSib.next.graphicID);
			this.cmd("Connect", rightSib.graphicID, 
				rightSib.next.graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				1, // Directed
				"", // Label
				rightSib.numKeys);					
		}
		
	}
	return tree;
	
}


 BPlusTree.prototype.stealFromLeft = function(tree, parentIndex) 
{
	var parentNode = tree.parent;
	// Steal from left sibling
	tree.numKeys++;
	this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
	
	if (tree.isLeaf && tree.next != null)
	{
		
		this.cmd("Disconnect", tree.graphicID, tree.next.graphicID);
		this.cmd("Connect", tree.graphicID, 
			tree.next.graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			1, // Directed
			"", // Label
			tree.numKeys);					
	}
	
	
	this.cmd("SetText", this.messageID, "Node has too few keys.  Stealing from left sibling.");
	
	for (i = tree.numKeys - 1; i > 0; i--)
	{
		tree.keys[i] = tree.keys[i-1];
		this.cmd("SetText", tree.graphicID, tree.keys[i], i);
	}
	var leftSib = parentNode.children[parentIndex -1];
	
	this.cmd("SetText", tree.graphicID, "", 0);
	this.cmd("SetText", parentNode.graphicID, "", parentIndex - 1);
	this.cmd("SetText", leftSib.graphicID, "", leftSib.numKeys - 1);
	
	
	if (tree.isLeaf)
	{
		this.cmd("CreateLabel", this.moveLabel1ID, leftSib.keys[leftSib.numKeys - 1], this.getLabelX(leftSib, leftSib.numKeys - 1),  leftSib.y)
		this.cmd("CreateLabel", this.moveLabel2ID,leftSib.keys[leftSib.numKeys - 1], this.getLabelX(leftSib, leftSib.numKeys - 1),  leftSib.y)
		tree.keys[0] = leftSib.keys[leftSib.numKeys - 1];
		parentNode.keys[parentIndex-1] = leftSib.keys[leftSib.numKeys - 1];
	}
	else
	{
		this.cmd("CreateLabel", this.moveLabel1ID, leftSib.keys[leftSib.numKeys - 1], this.getLabelX(leftSib, leftSib.numKeys - 1),  leftSib.y)
		this.cmd("CreateLabel", this.moveLabel2ID, parentNode.keys[parentIndex - 1], this.getLabelX(parentNode, parentIndex - 1),  parentNode.y)
		tree.keys[0] = parentNode.keys[parentIndex - 1];
		parentNode.keys[parentIndex-1] = leftSib.keys[leftSib.numKeys - 1];				
	}
	this.cmd("Move", this.moveLabel1ID, this.getLabelX(parentNode, parentIndex - 1),  parentNode.y);
	this.cmd("Move", this.moveLabel2ID, this.getLabelX(tree, 0), tree.y);
	
	this.cmd("Step")
	this.cmd("Delete", this.moveLabel1ID);
	this.cmd("Delete", this.moveLabel2ID);
	
	
	if (!tree.isLeaf)
	{
		for (var i = tree.numKeys; i > 0; i--)
		{
			this.cmd("Disconnect", tree.graphicID, tree.children[i-1].graphicID);
			tree.children[i] =tree.children[i-1];
			this.cmd("Connect", tree.graphicID, 
				tree.children[i].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				i);
		}
		tree.children[0] = leftSib.children[leftSib.numKeys];
		this.cmd("Disconnect", leftSib.graphicID, leftSib.children[leftSib.numKeys].graphicID);
		this.cmd("Connect", tree.graphicID, 
			tree.children[0].graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			0, // Directed
			"", // Label
			0);
		leftSib.children[leftSib.numKeys] = null;
		tree.children[0].parent = tree;
		
	}
	
	this.cmd("SetText", tree.graphicID, tree.keys[0], 0);						
	this.cmd("SetText", parentNode.graphicID, parentNode.keys[parentIndex - 1], parentIndex - 1);
	this.cmd("SetText", leftSib.graphicID,"", leftSib.numKeys - 1);
	
	leftSib.numKeys--;
	this.cmd("SetNumElements", leftSib.graphicID, leftSib.numKeys);
	this.resizeTree();
	this.cmd("SetText", this.messageID, "");
	
	
	if (tree.isLeaf)
	{
		this.cmd("Disconnect", leftSib.graphicID, tree.graphicID);
		this.cmd("Connect", leftSib.graphicID, 
			tree.graphicID,
			FOREGROUND_COLOR,
			0, // Curve
			1, // Directed
			"", // Label
			leftSib.numKeys);
		
	}
	
	
	return tree;
}


BPlusTree.prototype.repairAfterDelete = function(tree)
{
	if (tree.numKeys < this.min_keys)
	{
		if (tree.parent == null)
		{
			if (tree.numKeys == 0)
			{
				this.cmd("Delete", tree.graphicID);
				this.treeRoot = tree.children[0];
				if (this.treeRoot != null)
					this.treeRoot.parent = null;
				this.resizeTree();
			}
		}
		else 
		{
			var parentNode = tree.parent;
			for (var parentIndex = 0; parentNode.children[parentIndex] != tree; parentIndex++);
			
			
			if (parentIndex > 0 && parentNode.children[parentIndex - 1].numKeys > this.min_keys)
			{
				this.stealFromLeft(tree, parentIndex);
				
			}
			else if (parentIndex < parentNode.numKeys && parentNode.children[parentIndex + 1].numKeys > this.min_keys)
			{
				this.stealFromRight(tree,parentIndex);
				
			}
			else if (parentIndex == 0)
			{
				// Merge with right sibling
				var nextNode = this.mergeRight(tree);
				this.repairAfterDelete(nextNode.parent);			
			}
			else
			{
				// Merge with left sibling
				nextNode = this.mergeRight(parentNode.children[parentIndex-1]);
				this.repairAfterDelete(nextNode.parent);			
				
			}
			
			
		}
	}
	else if (tree.parent != null)
	{
		
		
	}
}









BPlusTree.prototype.getLabelX = function(tree, index) 
{
	return tree.x - WIDTH_PER_ELEM * tree.numKeys / 2 + WIDTH_PER_ELEM / 2 + index * WIDTH_PER_ELEM;
}

BPlusTree.prototype.resizeTree = function()
{
	this.resizeWidths(this.treeRoot);
	this.setNewPositions(this.treeRoot, this.starting_x, STARTING_Y);
	this.animateNewPositions(this.treeRoot);
}

BPlusTree.prototype.setNewPositions = function(tree, xPosition, yPosition)
{
	if (tree != null)
	{
		tree.y = yPosition;
		tree.x = xPosition;
		if (!tree.isLeaf)
		{
			var leftEdge = xPosition - tree.width / 2;
			var priorWidth = 0;
			for (var i = 0; i < tree.numKeys+1; i++)
			{
				this.setNewPositions(tree.children[i], leftEdge + priorWidth + tree.widths[i] / 2, yPosition+HEIGHT_DELTA);
				priorWidth += tree.widths[i];
			}
		}				
	}			
}

BPlusTree.prototype.animateNewPositions = function(tree)
{
	if (tree == null)
	{
		return;
	}
	var i;
	for (i = 0; i < tree.numKeys + 1; i++)
	{
		this.animateNewPositions(tree.children[i]);
	}
	this.cmd("Move", tree.graphicID, tree.x, tree.y);
}

BPlusTree.prototype.resizeWidths = function(tree) 
{
	if (tree == null)
	{
		return 0;
	}
	if (tree.isLeaf)
	{
		for (var i = 0; i < tree.numKeys + 1; i++)
		{
			tree.widths[i] = 0;
		}
		tree.width = tree.numKeys * WIDTH_PER_ELEM + NODE_SPACING;
		return tree.width;				
	}
	else
	{
		var treeWidth = 0;
		for (i = 0; i < tree.numKeys+1; i++)
		{
			tree.widths[i] = this.resizeWidths(tree.children[i]);
			treeWidth = treeWidth + tree.widths[i];
		}
		treeWidth = Math.max(treeWidth, tree.numKeys * WIDTH_PER_ELEM + NODE_SPACING);
		tree.width = treeWidth;
		return treeWidth;
	}
}
	



function BTreeNode(id, initialX, initialY)
{
	this.widths = [];
	this.keys = [];
	this.children = [];
	this.x = initialX;
	this.y = initialY;
	this.graphicID = id;
	this.numKeys = 1;
	this.isLeaf = true;
	this.parent = null;
	
	this.leftWidth = 0;
	this.rightWidth = 0;
	// Could use children for next pointer, but I got lazy ...
	this.next = null;
	
	
}





var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new BPlusTree(animManag, canvas.width, canvas.height);
}
