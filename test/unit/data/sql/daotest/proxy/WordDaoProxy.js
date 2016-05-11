'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('WordDaoProxy',
	[
'MFUtils', 'MFDaoProxyAbstract',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(MFUtils, MFDaoProxyAbstract
//@non-generated-end
)
{

	var WordDaoProxy = function WordDaoProxy(){
		// Constructor
		WordDaoProxy._Parent.call(this);

//@non-generated-start[constructor][X]
//@non-generated-end
	};

	MFUtils.extendFromInstance(WordDaoProxy, MFDaoProxyAbstract);



	//==================================================================================
	//========   ABSTRACT METHODS
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoProxy#getNbEntities
	 * @function
	 *
	 * @description
	 * Returns the number of entities.
	 *
	 * @param {MFContext} p_context MFContext object
	 *
	 * @returns {Integer} Returns an Integer equal to the number of entities.
	 */
	WordDaoProxy.prototype.getNbEntities = function(p_context) {

		return this.getDaoImpl().getNbEntities(p_context);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoProxy#getWordById
	 * @function
	 *
	 * @description
	 * Returns a Word by id.
	 *
	 * @param {Integer} p_id Integer id of the Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Word} Returns the Word, including children if required
	 */
	WordDaoProxy.prototype.getWordById = function(p_id, p_context, p_cascadeSet) {

		return this.getDaoImpl().getWordById(p_id, p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#getListWord
	 * @function
	 *
	 * @description
	 * Returns a list of Words according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Words, including children if required.
	 */
	WordDaoProxy.prototype.getListWord = function(p_context, p_cascadeSet) {

		return this.getDaoImpl().getListWord(p_context, p_cascadeSet);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#getListWordByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Words by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Words to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Words, including children if required.
	 */
	WordDaoProxy.prototype.getListWordByIds = function(p_ids, p_context, p_cascadeSet) {

		return this.getDaoImpl().getListWordByIds(p_ids, p_context, p_cascadeSet);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoProxy#saveWord
	 * @function
	 *
	 * @description
	 * Saves a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was saved, false otherwise.
	 */
	WordDaoProxy.prototype.saveWord = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveWord(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#saveListWord
	 * @function
	 *
	 * @description
	 * Saves a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was saved, false otherwise.
	 */
	WordDaoProxy.prototype.saveListWord = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().saveListWord(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#updateWord
	 * @function
	 *
	 * @description
	 * Updates a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was updated, false otherwise.
	 */
	WordDaoProxy.prototype.updateWord = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateWord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#updateListWord
	 * @function
	 *
	 * @description
	 * Updates a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was updated, false otherwise.
	 */
	WordDaoProxy.prototype.updateListWord = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().updateListWord(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#saveOrUpdateWord
	 * @function
	 *
	 * @description
	 * Saves of updates a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was saved or updated, false otherwise.
	 */
	WordDaoProxy.prototype.saveOrUpdateWord = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateWord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#saveOrUpdateListWord
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was saved or updated, false otherwise.
	 */
	WordDaoProxy.prototype.saveOrUpdateListWord = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

		return this.getDaoImpl().saveOrUpdateListWord(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete);
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoProxy#deleteWord
	 * @function
	 *
	 * @description
	 * Delete a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was deleted, false otherwise.
	 */
	WordDaoProxy.prototype.deleteWord = function(p_entity, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteWord(p_entity, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#deleteWordById
	 * @function
	 *
	 * @description
	 * Deletes a Word by id.
	 *
	 * @param {Integer} p_id Integer id of the Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was deleted, false otherwise.
	 */
	WordDaoProxy.prototype.deleteWordById = function(p_id, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteWordById(p_id, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#deleteListWord
	 * @function
	 *
	 * @description
	 * Deletes a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was deleted, false otherwise.
	 */
	WordDaoProxy.prototype.deleteListWord = function(p_entities, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListWord(p_entities, p_context, p_cascadeSet, p_toSync);
	};


	/**
	 * @ngdoc method
	 * @name WordDaoProxy#deleteListWordByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Words by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was deleted, false otherwise.
	 */
	WordDaoProxy.prototype.deleteListWordByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

		return this.getDaoImpl().deleteListWordByIds(p_ids, p_context, p_cascadeSet, p_toSync);
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new WordDaoProxy();
}]);
