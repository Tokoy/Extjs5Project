/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Extjs5Demo.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Extjs5Demo.view.main.MainController',
        'Extjs5Demo.view.main.MainModel',
		'Ext.tab.Panel',
        'Ext.layout.container.Border',
		'Ext.ux.DataTip',
		'Ext.grid.*',
		'Ext.layout.container.*',
		'Ext.form.*',
		'Ext.layout.container.*',
		'Ext.form.Panel',
		'Ext.data.*',
		'Extjs5Demo.model.user'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    }
});


Ext.onReady(function(){
	//Initialization tab Ext: Qtip property.
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	//json
	var userStore=Ext.create('Ext.data.JsonStore',{
		fields: ['username', 'password'],
		storeId: 'myStore',
		/*model:{
			fields: [
				{name: 'id',  type: 'int'},
				{name: 'username',  type: 'string'},
				{name: 'password',   type: 'string'}
			]
		},*/
		//model:'user',
		autoLoad : true,
		proxy:{
			type:'ajax',
			url:'user.json',
			reader:{
				type:'json',
				rootProperty:'users'
			}
		}
	});
	userStore.load();

	//alert(userStore.getAt(0).get('username'));
	//submit button function
	var btnsubmitclick=function(){
			var checkuname=false;
			var uname=txtusername.getValue();
			var pwd=txtpassword.getValue();
		for(var i=0;i<userStore.getCount();i++)
		{
			var urecord=userStore.getAt(i).get('username');
			var precord=userStore.getAt(i).get('password');
			if(uname==urecord&&pwd==precord)
			{
				checkuname=true;
			}
		}
		if(checkuname){
				Ext.Msg.alert('Tip','Login Successful!');
		}
		else {
			Ext.Msg.alert('Tip', 'Login Fail!');
		}
	};
	//UserNameRegist input
	var txtusernameRegist=new Ext.form.TextField({
		width:220,
		allowBlank:false,
		maxLength:20,
		name:'username',
		fieldLabel:'UserName',
		blankText:'Please input the Regist UserName',
		maxLengthText:'Username can not be more than 20 characters'
	});
	//PasswordRegist input
	txtpasswordRegist = new Ext.form.TextField({
		width: 220,
		allowBlank: false,
		maxLength: 20,
		name: 'passwordregist',
		fieldLabel: 'PassWord',
		blankText: 'Please input the Regist PassWord',
		maxLengthText: 'Password can not be more the 20 characters'
	});
	//reset button function
	var btnresetclick=function(){
		form.getForm().reset();
	};
	//regist button function
	var btnregistclick=function(){
		win2.show();
		win.hide();
	};
	//registsubmit button function
	var btnregistsubmitclick=function()
	{
		var rguname=txtusernameRegist.getValue();
		var rgpwd=txtpasswordRegist.getValue();
		//add joson data
		if(rguname!=null||rgpwd!=null){
		userStore.add(
			{username:rguname,password:rgpwd}
		);
		win2.hide();
		win.show();
		}
	};
	//regist button
	var btnregist=new Ext.Button({
		text:'Regist',
		handler:btnregistclick
	});
	//submit button
	var btnsubmit=new Ext.Button({
		text:'Submit',
		handler:btnsubmitclick
	});
	//btnregistSubmit button
	var btnregistsumbit=new Ext.Button({
		text:'Regist',
		handler:btnregistsubmitclick
	});
	//reset button
	var btnreset=new Ext.Button({
		text:'Reset',
		handler: btnresetclick
	});
	//UserName input
	var txtusername=new Ext.form.TextField({
		width:220,
		allowBlank:false,
		maxLength:20,
		name:'username',
		fieldLabel:'UserName',
		blankText:'Please input the UserName',
		maxLengthText:'Username can not be more than 20 characters'
	});
	//Password input
	txtpassword = new Ext.form.TextField({
		width: 220,
		allowBlank: false,
		maxLength: 20,
		inputType: 'password',
		name: 'password',
		fieldLabel: 'PassWord',
		blankText: 'Please input the PassWord',
		maxLengthText: 'Password can not be more the 20 characters'
	});
	//Checkcode input
	//var txtcheckcode=new Ext.form.TextField({
	//	fieldLaber:'checkcode',
	//	id:'checkcode',
	//	allowBlank:false,
	//	width:80,
	//	blankText:'Please input the checkCode',
	//	maxLength:4,
	//	maxLengthText:'Checkcode can not be more the 4 characters'
	//});
	//Form
	form = new Ext.form.FormPanel({
		labelAlign:'right',
		labelWidth:45,
		frame: true,		
		cls:'loginform',
		buttonAlign:'center',
		bodyStyle:'padding:6px 0px 0px 15px',
		items: [txtusername, txtpassword],
		buttons:[btnsubmit,btnregist]
	});
	//form2
	form2=new Ext.form.FormPanel({
		labelAlign:'right',
		labelWidth:45,
		frame: true,
		cls:'tableForm',
		buttonAlign:'center',
		bodyStyle:'padding:6px 0px 0px 15px',
		items:[txtusernameRegist,txtpasswordRegist],
		buttons:[btnregistsumbit]
	});
	//Window
	var win;
	win = new Ext.Window({
		title: 'Login',
		iconCls:'loginicon',
		plain:true,
		width: 276,
		resizable: false,
		shadow:false,
		modal: false,
		closable: true,
		animCollapse:true,
		items: form
	});
	win.show();

	//window2
	var win2;
	win2=new Ext.Window({
		title:'Regist',
		plain:true,
		width:300,
		resizable:false	,
		shadow:true,
		modal: false,
		closable: false,
		items: form2
	});
	
	// create checkcode
	//var checkCode=Ext.getDom('checkcode');
	//var checkImage=Ext.get(checkCode.parentNode);
	//checkImage.createChild({
	//	tag:'img',
	//	float:'right',
	//	src:'image/checkcode.gif',
	//	align:'absbottom',
	//	style:'position: absolute;left: 150px;top: 65px;'
	//});

});
